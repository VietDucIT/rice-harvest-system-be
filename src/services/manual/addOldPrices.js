// To run: node ./src/services/manual/addOldPrices.js
const cheerio = require("cheerio");
const request = require("request-promise");

const RicePrice = require("../../models/RicePrice");

const postArray = require("../../data/posts.json");

try {
  for (let post of postArray) {
    console.log(post);
    request(post, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // get DATE of the post
        const datetime = $(".article-date").text();
        const index = datetime.indexOf(", ") + 2;
        const date = datetime.slice(index, index + 10);
        // console.log(date);

        RicePrice.countDocuments({ date: date }, function (err, count) {
          if (count == 0) {
            $(".__MASTERCMS_TABLE_DATA tr").first().remove(); // remove heading of table
            $(".__MASTERCMS_TABLE_DATA tr").each((index, el) => {
              let min, max, average;
              const rice = $(el).find("td").find("p").first().text();
              const price = $(el).find("td:nth-child(3)").find("p").text();
              // console.log(rice + ": " + price);

              if (price.includes(" – ")) {
                let index = price.indexOf(" – ");
                min = parseInt(price.slice(0, index).replace(".", ""));
                max = parseInt(price.slice(index + 3).replace(".", ""));
                average = parseInt((min + max) / 2);
              } else if (price.includes(" - ")) {
                let index = price.indexOf(" - ");
                min = parseInt(price.slice(0, index).replace(".", ""));
                max = parseInt(price.slice(index + 3).replace(".", ""));
                average = parseInt((min + max) / 2);
              } else {
                average = parseInt(price.replace(".", ""));
              }

              // save to database
              const ricePrice = new RicePrice({
                rice,
                price,
                average,
                date,
              });
              console.log(ricePrice);
              ricePrice.save();
            });
          }
        });
      } else {
        console.log(error);
      }
    });
  }
} catch (err) {
  console.log("Error from addOldPrices: ", err);
}
