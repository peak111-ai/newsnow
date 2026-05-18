import { defineSource } from "../utils/source";
import * as cheerio from "cheerio";

export default defineSource({
  name: "江西省审计厅",
  url: "https://audit.jiangxi.gov.cn/jxssjt/col/col28581/index.html",
  async fetch() {
    const res=await fetch(this.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://audit.jiangxi.gov.cn/"
      }
    });
    const html=await res.text();
    const $=cheerio.load(html);
    const list: Array<{ title: string; url: string; date: string }> = [];

    $("div.list-container ul li").each((_, el) => {
      const a = $(el).find("a");
      const title = a.text().trim();
      const href = a.attr("href");
      const date = $(el).find(".time").text().trim();
      if (title && href) {
        list.push({
          title,
          url: new URL(href, this.url).href,
          date
        });
      }
    });

    return list;
  }
});
