import { defineSource } from "../utils/source";
import * as cheerio from "cheerio";

export default defineSource({
  name: "南昌市审计局",
  //修复 1：换成 HTTPS 正确地址
  url: "https://sjj.nc.gov.cn/nvsjj/sjdt/list.shtml",

  async fetch() {
    const res = await fetch(this.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://sjj.nc.gov.cn/"
      }
    });

    const html = await res.text();
    const $ = cheerio.load(html);
    const list: Array<{ title: string; url: string; date: string }> = [];

    //修复 2：正确的列表选择器（这是最关键的！）
    $("div.list li").each((_, el) => {
      const a = $(el).find("a");
      const title = a.text().trim();
      const href = a.attr("href");
      
      //修复 3：正确的日期选择器
      const date = $(el).find("font").text().trim();

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
