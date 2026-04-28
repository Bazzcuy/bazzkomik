import axios from "axios";
import * as cheerio from "cheerio";

const baseUrl = process.env.KOMIKU_URL || "https://komiku.org";
const baseApi = process.env.API_KOMIKU_URL || "https://api.komiku.org";
const replaceMangaPage = "https://komiku.org/manga/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const AxiosService = async (url: string) => {
  try {
    const response = await axiosInstance.get(encodeURI(url));
    if (response.status === 200) {
      return response;
    }
    throw new Error(`Error: ${response.status}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function getMangaList(page: number = 1) {
  const path = page === 1 ? "/manga/" : `/manga/page/${page}/`;
  const url = baseApi + path;
  
  try {
    const response = await AxiosService(url);
    const $ = cheerio.load(response.data);
    const element = $(".bge");
    const manga_list: any[] = [];

    element.each((idx, el) => {
      const title = $(el).find(".kan > a").find("h3").text().trim();
      const endpoint = $(el).find("a").attr("href")?.replace(replaceMangaPage, "") || "";
      const type = $(el).find(".bgei > a").find(".tpe1_inf > b").text();
      const updated_on = $(el).find(".kan > .judul2").text().split("|")[1]?.trim() || "";
      const thumb = $(el).find(".bgei > a").find("img").attr("src");
      const chapter = $(el).find("div.kan > div:nth-child(5) > a > span:nth-child(2)").text();
      
      manga_list.push({ title, thumb, type, updated_on, endpoint, chapter });
    });
    return { status: true, manga_list };
  } catch (error: any) {
    return { status: false, manga_list: [], message: error.message };
  }
}

export async function getPopularManga(page: number = 1) {
  const path = page === 1 ? `/other/rekomendasi/` : `/other/rekomendasi/page/${page}/`;
  const url = baseApi + path;

  try {
    const response = await AxiosService(url);
    const $ = cheerio.load(response.data);
    const element = $(".bge");
    const manga_list: any[] = [];

    element.each((idx, el) => {
      const title = $(el).find(".kan").find("h3").text().trim();
      const endpoint = $(el).find("a").attr("href")?.replace(replaceMangaPage, "").replace("/manga/", "") || "";
      const type = $(el).find("div.bgei > a > div.tpe1_inf > b").text();
      const thumb = $(el).find("div.bgei > a > img").attr("src");
      const sortDesc = $(el).find("div.kan > p").text().trim();
      const upload_on = $(el).find("div.kan > span.judul2").text().split("•")[1]?.trim() || "";
      
      manga_list.push({ title, type, thumb, endpoint, upload_on, sortDesc });
    });
    return { status: true, manga_list };
  } catch (error: any) {
    return { status: false, manga_list: [], message: error.message };
  }
}

export async function getMangaDetail(slug: string) {
  try {
    const response = await AxiosService(`/manga/${slug}`);
    const $ = cheerio.load(response.data);
    const element = $(".perapih");
    const genre_list: any[] = [];
    const chapter: any[] = [];
    const obj: any = {};

    const getMeta = element.find(".inftable > tbody").first();
    obj.title = $("#Judul > h1").text().trim();
    obj.type = $("tr:nth-child(2) > td:nth-child(2)").find("b").text();
    obj.author = $("#Informasi > table > tbody > tr:nth-child(4) > td:nth-child(2)").text().trim();
    obj.status = $(getMeta).children().eq(4).find("td:nth-child(2)").text();
    obj.manga_endpoint = slug;
    obj.thumb = element.find(".ims > img").attr("src");

    element.find(".genre > li").each((idx, el) => {
      genre_list.push({ genre_name: $(el).find("a").text().trim() });
    });
    obj.genre_list = genre_list;

    obj.synopsis = element.find("#Sinopsis").find("p").text().trim();

    $("#Daftar_Chapter > tbody").find("tr").each((index, el) => {
      const chapter_title = $(el).find("a").text().trim();
      const chapter_endpoint = $(el).find("a").attr("href");
      if (chapter_endpoint) {
        chapter.push({
          chapter_title,
          chapter_endpoint: chapter_endpoint.replace("/ch/", ""),
        });
      }
    });
    obj.chapter = chapter;

    return { status: true, data: obj };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}

export async function searchManga(query: string) {
  const url = baseApi + `?post_type=manga&s=${query}`;
  try {
    const response = await AxiosService(url);
    const $ = cheerio.load(response.data);
    const element = $(".bge");
    const manga_list: any[] = [];

    element.each((idx, el) => {
      const endpoint = $(el).find("a").attr("href")?.replace(replaceMangaPage, "").replace("/manga/", "") || "";
      const thumb = $(el).find("div.bgei > a > img").attr("data-src") || $(el).find("div.bgei > a > img").attr("src");
      const type = $(el).find("div.bgei > a > div.tpe1_inf > b").text();
      const title = $(el).find(".kan").find("h3").text().trim();
      const updated_on = $(el).find("div.kan > p").text().split(".")[0]?.trim() || "";
      
      manga_list.push({ title, thumb, type, endpoint, updated_on });
    });
    return { status: true, manga_list };
  } catch (error: any) {
    return { status: false, manga_list: [], message: error.message };
  }
}

export async function getChapter(slug: string) {
  try {
    const response = await AxiosService(`/${slug}/`);
    const $ = cheerio.load(response.data);
    const chapter_image: any[] = [];
    const obj: any = {};
    
    obj.chapter_endpoint = slug + "/";
    obj.chapter_name = slug.split('-').join(' ').trim();
    obj.title = $('#Judul > header > p > a > b').text().trim();

    const getTitlePages = $("#article").find(".dsk2");
    getTitlePages.filter(() => {
      obj.title = $(getTitlePages).find("h1").text().replace("Komik ", "");
      return true;
    });

    const getPages = $('#Baca_Komik > img');
    obj.chapter_pages = getPages.length;
    getPages.each((i, el) => {
      let imgSrc = $(el).attr("src");
      if (imgSrc) {
        imgSrc = imgSrc.replace('https://i0.wp.com/', '').replace('i0.wp.com/', '');
      }
      chapter_image.push({
        chapter_image_link: imgSrc,
        image_number: i + 1,
      });
    });
    obj.chapter_image = chapter_image;

    return { status: true, data: obj };
  } catch (error: any) {
    return { status: false, message: error.message };
  }
}
