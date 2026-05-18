import { defineSource } from "../utils/source";
import * as cheerio from "cheerio";

export default defineSource({
  name: "南昌市审计局",
  url: "http://sjj.nc.gov.cn/nvsjj/gggs/index.shtml",
  async fetch() {
    const res=await fetch(this.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "http://sjj.nc.gov.cn/"
      }
    });
    const html=await res.text();
    const $=cheerio.load(html);
    const list: Array<{ title: string; url: string; date: string }> = [];

    $("ul.list li").each((_, el) => {
      const a = $(el).find("a");
      const title = a.text().trim();
      const href = a.attr("href");
      const date = $(el).find("span").text().trim();
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
