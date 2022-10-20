const cheerio = require("cheerio");
const request = require("request-promise");
// const fs = require("fs");
const { ObjectId } = require("mongodb");

const Rice = require("../models/Rice");
const RicePrice = require("../models/RicePrice");

const urlTopic = "https://congthuong.vn/chu-de/gia-lua-gao-hom-nay.topic";

class RiceController {
  // [GET] /rice-price/
  async show(req, res) {
    // delete all data in Rice Price collection
    await RicePrice.deleteMany({});

    // get URL of the latest post (rice price of today)
    request(urlTopic, (error, response, html) => {
      let urlLatestPost = "";
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        urlLatestPost = $(".article")
          .first()
          .find(".article-link")
          .attr("href");
        // console.log("Latest Post: ", urlLatestPost);

        // get rice price data of the lastest post
        request(urlLatestPost, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            // let data = [];

            $(".__MASTERCMS_TABLE_DATA tr").first().remove(); // remove heading of table
            $(".__MASTERCMS_TABLE_DATA tr").each((index, el) => {
              const rice = $(el).find("td").find("p").first().text();
              const price = $(el).find("td:nth-child(3)").find("p").text();
              // const date = new Date();
              // console.log(rice + ": " + price);

              // save to database
              const ricePrice = new RicePrice({
                rice,
                price,
                // date: date.toString(),
              });
              // ricePrice._id = new ObjectId().toString();
              // console.log("Rice Price: ", ricePrice);
              ricePrice.save();

              // save to file data.json
              // data.push({ rice, price });
              // fs.writeFileSync("./src/data/data.json", JSON.stringify(data));
            });
          } else {
            console.log(error);
          }
        });
      } else {
        console.log(error);
      }
    });

    RicePrice.find()
      .then((rice) => {
        res.json(rice).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });

    // res.json({ ok: "ok" }).end();
  }
}

module.exports = new RiceController();
