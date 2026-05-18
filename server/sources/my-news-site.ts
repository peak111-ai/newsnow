import { defineSource } from "../utils/source";
import { parse } from "rss-to-json";

export default defineSource({
  async fetch() {
    return [];
  },
});
