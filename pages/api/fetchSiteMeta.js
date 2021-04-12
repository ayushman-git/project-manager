import axios from "axios";
import cheerio from "cheerio";

const url = "https://www.npmjs.com/package/cheerio";

const fetchWebsiteDom = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const getMetaTags = async (url) => {
  const meta = { default: {}, og: {}, twitter: {}, icons: {} };
  const $ = cheerio.load(await fetchWebsiteDom(url));

  // default meta tags
  if ($("meta[name=description]").attr("content"))
    meta.default.description = $("meta[name=description]").attr("content");

  if ($("title").text()) meta.default.title = $("title").text();

  if ($("meta[name=theme-color]").attr("content"))
    meta.default.themeColor = $("meta[name=theme-color]").attr("content");

  if ($("meta[name=application-name]").attr("content"))
    meta.default.applicationName = $("meta[name=application-name]").attr(
      "content"
    );

  if ($("meta[name=generator]").attr("content"))
    meta.default.generator = $("meta[name=generator]").attr("content");

  if ($("meta[name=subject]").attr("content"))
    meta.default.subject = $("meta[name=subject]").attr("content");

  // og meta tags
  if ($("meta[property='og:title']").attr("content"))
    meta.og.title = $("meta[property='og:title']").attr("content");

  if ($("meta[property='og:site_name']").attr("content"))
    meta.og.siteName = $("meta[property='og:site_name']").attr("content");

  if ($("meta[property='og:image']").attr("content"))
    meta.og.image = $("meta[property='og:image']").attr("content");

  if ($("meta[property='og:description']").attr("content"))
    meta.og.description = $("meta[property='og:description']").attr("content");

  // twitter meta tags
  if ($("meta[name='twitter:title']").attr("content"))
    meta.twitter.title = $("meta[name='twitter:title']").attr("content");

  if ($("meta[name='twitter:image']").attr("content"))
    meta.twitter.image = $("meta[name='twitter:image']").attr("content");

  if ($("meta[name='twitter:description']").attr("content"))
    meta.twitter.description = $("meta[name='twitter:description']").attr(
      "content"
    );

  // icons
  if ($("link[rel='apple-touch-icon']").attr("href"))
    meta.icons.appleTouchIcon = $("link[rel='apple-touch-icon']").attr("href");

  if ($("link[rel='icon']").attr("href"))
    meta.icons.icon = $("link[rel='icon']").attr("href");

  return meta;
};

export default async function handler(req, res) {
  res.status(200).json(await getMetaTags(url));
}
