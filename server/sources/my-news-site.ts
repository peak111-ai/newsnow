import { defineSource } from "../utils/source";
import * as cheerio from "cheerio";

export default defineSource({
  async fetch() {
    // 【第一步：改成你要抓取的网站新闻列表地址】
    const res = await fetch("https://www.audit.gov.cn/n4/n20/index.html");
    const html = await res.text();
    const $ = cheerio.load(html);
    const list: any[] = [];

    // 【第二步：改成网站里新闻标题的选择器（一般是 li 里的 a 标签）】
    $("ul.news-list li a").each((_, el) => {
      const title = $(el).text().trim();
      let link = $(el).attr("href") || "";
      if (!link) return;

      // 【第三步：改成网站的主域名，用来补全相对链接】
      if (link.startsWith("/")) {
        link = "https://www.audit.gov.cn" + link;
      }

      list.push({
        title,
        url: link,
      });
    });
    return list.slice(0,15); // 最多取15条，避免占满页面
  },
});
