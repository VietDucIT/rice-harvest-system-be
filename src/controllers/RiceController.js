const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");
const { ObjectId } = require("mongodb");

const RicePrice = require("../models/RicePrice");

class RiceController {
  // [GET] /rice-price
  show(req, res) {
    RicePrice.find({ date: req.params.date })
      .then((rice) => {
        res.json(rice).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  showList(req, res) {
    RicePrice.find()
      .then((rice) => {
        res.json(rice.name).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  add(req, res) {
    const url =
      "https://congthuong.vn/gia-lua-gao-hom-nay-910-va-tong-ket-tuan-qua-gao-noi-dia-on-dinh-xuat-khau-tang-5-usdtan-222557.html";

    request(url, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let data = [];

        $(".__MASTERCMS_TABLE_DATA tr").first().remove(); // remove heading
        $(".__MASTERCMS_TABLE_DATA tr").each((index, el) => {
          const rice = $(el).find("td").find("p").first().text();
          const price = $(el).find("td:nth-child(3)").find("p").text();

          // save to file data.json
          const ricePrice = new RicePrice({ rice, price });
          ricePrice._id = new ObjectId().toString();
          // console.log("Rice Price: ", ricePrice);
          data.push({ rice, price });
          fs.writeFileSync("data.json", JSON.stringify(data));

          ricePrice
            .save()
            .then(() => {
              res.sendStatus(200).end();
            })
            .catch((err) => {
              res.status(500).end();
              console.log(err);
            });
        });
      } else {
        console.log(error);
      }
    });
  }
}

module.exports = new RiceController();
