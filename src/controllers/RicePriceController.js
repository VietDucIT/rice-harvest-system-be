const cheerio = require("cheerio");
const request = require("request-promise");
// const fs = require("fs");
const { ObjectId } = require("mongodb");

const RicePrice = require("../models/RicePrice");
const PredictionRicePrice = require("../models/PredictionRicePrice");

const urlTopic = "https://congthuong.vn/chu-de/gia-lua-gao-hom-nay.topic";

// get today's post
const getTodayPost = async () => {
  const currentTime = new Date();
  const todayOnURL =
    currentTime.getDate().toString() + (currentTime.getMonth() + 1).toString();

  return new Promise((resolve, reject) => {
    request(urlTopic, (error, response, html) => {
      // if (!error && response.statusCode == 200) {
      let urlLatestPost = "";
      const $ = cheerio.load(html);
      urlLatestPost = $(".article").first().find(".article-link").attr("href");

      if (
        urlLatestPost.includes(
          `https://congthuong.vn/gia-lua-gao-hom-nay-${todayOnURL}`
        )
      ) {
        // console.log("From getTodayPost: ", urlLatestPost);
        resolve(urlLatestPost);
      } else {
        reject(error);
      }
      // } else {
      //   console.log(error);
      //   reject(error);
      // }
    });
  });
};

class RiceController {
  // [GET] /rice-price/
  show(req, res) {
    const currentTime = new Date();

    const yyyy = currentTime.getFullYear();
    let mm = currentTime.getMonth() + 1;
    let dd = currentTime.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    const today = dd + "/" + mm + "/" + yyyy;

    RicePrice.find({ date: today })
      .then((rice) => {
        // console.log(rice);
        res.json(rice).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [GET] /rice-price/prediction
  predict(req, res) {
    // FIND PREDICTION, NEED TO ADD A FIELD TO SCHEMA ???
    console.log("Get prediction");

    var spawn = require("child_process").spawn;
    var process = spawn("python", ["src/services/predictRicePrice.py"]);
    process.stdout.on("data", (data) => {
      console.log(data.toString());
      res.send(data.toString()).end();
    });

    // METHOD 2
    // let { PythonShell } = require("python-shell");
    // var options = {
    //   // scriptPath: "src/services/",
    //   args: [req.query.firstname, req.query.lastname],
    // };
    // PythonShell.run("src/services/process.py", options, function (err, data) {
    //   if (err) {
    //     console.log(err);
    //     res.send(err).end();
    //   } else {
    //     console.log(data.toString());
    //     res.send(data.toString()).end();
    //   }
    // });

    // PredictionRicePrice.find({})
    //   .then((rice) => {
    //     // console.log(rice);
    //     res.json(rice).end();
    //   })
    //   .catch((err) => {
    //     res.status(500).end();
    //     console.log(err);
    //   });
  }

  // [GET] /rice-price/check
  checkToUpdate(req, res) {
    const currentTime = new Date();

    const yyyy = currentTime.getFullYear();
    let mm = currentTime.getMonth() + 1;
    let dd = currentTime.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const today = dd + "/" + mm + "/" + yyyy;
    // console.log("Today: ", today);

    RicePrice.findOne({ date: today }, async (err, result) => {
      if (err) {
        console.log("Error: ", err);
        res.send(false).end();
      } else if (result) {
        console.log("Result: ", result);
        res.send(false).end();
      } else {
        try {
          const urlTodayPost = getTodayPost();
          console.log("Need to update Rice Price.");
          res.send(true).end();
        } catch (error) {
          console.log("There's no today's post.", error);
          res.send(false).end();
        }
      }
    });
  }

  // [PUT] /rice-price/update
  async update(req, res) {
    // delete all data in Rice Price collection
    // await RicePrice.updateMany({}, { isDeleted: true });

    try {
      const urlTodayPost = await getTodayPost();
      console.log("Today's post: ", urlTodayPost);
      await request(urlTodayPost, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          // let data = "";

          // const columnDelimiter = ",";
          // const lineDelimiter = "\n";
          // data +=
          //   "Date" +
          //   columnDelimiter +
          //   "Average" +
          //   columnDelimiter +
          //   "Rice" +
          //   lineDelimiter;

          // get DATE of the post
          const datetime = $(".article-date").text();
          const index = datetime.indexOf(", ") + 2;
          const date = datetime.slice(index, index + 10);
          // console.log(date);

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
              min,
              max,
              average,
              date,
              // isDeleted: false,
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
    } catch (err) {
      console.log("From Update, there's no today's post.", err);
    }

    res.sendStatus(200).end();
  }
}

module.exports = new RiceController();
