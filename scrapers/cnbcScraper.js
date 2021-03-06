const cheerio = require("cheerio");
const request = require("request");
const Berita = require("../models/Berita.model");

let cnbcNews = [];

function cnbcScraper() {
  request(
    "https://www.cnbcindonesia.com/tag/corona",
    async (err, res, html) => {
      if (!err && res.statusCode === 200) {
        const $ = cheerio.load(html);

        $("article").each((i, el) => {
          const title = $(el).find("h2").text();
          const dateLabel = $(el).find(".date").text();
          const url = $(el).find("a").attr("href");
          const thumbnail = $(el).find("img").attr("src");

          const date = dateLabel.split(" - ");

          cnbcNews.push({
            title: title.trim(),
            date: date[1].trim(),
            label: date[0].trim(),
            url,
            thumbnail,
          });
        });

        try {
          const update = await Berita.findOne({ source: "CNBC News" });

          update.news = cnbcNews;
          update.timeFetched = new Date();

          await update.save();

          cnbcNews = [];
          console.log("CNBCNews saved to database");
        } catch (err) {
          cnbcNews = [];
          console.error(err);
        }
      }
    }
  );
}

module.exports = cnbcScraper;
