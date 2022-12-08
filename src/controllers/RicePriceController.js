const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

const RicePrice = require("../models/RicePrice");

const stringifyDate = require("../services/stringifyDate");

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
        console.log("From getTodayPost: ", urlLatestPost);
        resolve(urlLatestPost);
      } else {
        reject(error);
      }
    });
  });
};

class RiceController {
  // [GET] /rice-price/prediction
  predict(req, res) {
    console.log("Get prediction");
    // Method 1: Using child_process.spawn
    var spawn = require("child_process").spawn;
    var process = spawn("python", [
      "src/services/predictRicePriceWithArima.py",
      // "src/services/testPython.py",
    ]);
    process.stdout.on("data", (data) => {
      res.send(data).end();
    });

    // Method 2: Using PythonShell
    // let { PythonShell } = require("python-shell");
    // let options = {};
    // PythonShell.run(
    //   "src/services/testPython.py",
    //   options,
    //   function (err, data) {
    //     if (err) {
    //       console.log(err);
    //       res.send(err).end();
    //     } else {
    //       console.log(data.toString());
    //       res.send(data.toString()).end();
    //     }
    //   }
    // );
  }

  // [GET] /rice-price/history
  getHistory(req, res) {
    const today = stringifyDate(new Date());
    const yesterday = stringifyDate(new Date(Date.now() - 86400000)); // 24*60*60*1000
    const preYesterday = stringifyDate(new Date(Date.now() - 86400000 * 2));
    // console.log(preYesterday, yesterday, today);

    // name descrising (Z -> A), date increasing
    const sortRices = (a, b) => {
      const dateA = new Date(
        Number(a.date.slice(6, 10)),
        Number(a.date.slice(3, 5)),
        Number(a.date.slice(0, 2))
      );
      const dateB = new Date(
        Number(b.date.slice(6, 10)),
        Number(b.date.slice(3, 5)),
        Number(b.date.slice(0, 2))
      );

      if (a.rice.localeCompare(b.rice) > 0) return -1;
      else if (a.rice.localeCompare(b.rice) < 0) return 1;
      else return dateA - dateB;
    };

    RicePrice.find({
      date: { $in: [preYesterday, yesterday, today] },
      rice: { $in: ["OM 5451", "OM 18", "IR 504", "Đài thơm 8"] },
    })
      .then((rices) => {
        const rices2 = rices.sort(sortRices);
        // console.log("Rices after sorting: \n", rices2);
        let historyArray = [];
        for (let rice of rices2) {
          historyArray.push(rice.average);
        }
        res.send(historyArray).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
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
        console.log("Error from checkToUpdate: ", err);
        res.send(false).end();
      } else if (result) {
        console.log("A Rice Price of today: ", result);
        res.send(false).end();
      } else {
        try {
          const urlTodayPost = await getTodayPost();
          console.log("Need to update Rice Price.", urlTodayPost);
          res.send(true).end();
        } catch (error) {
          console.log("There's no today's post.", error);
          res.send(false).end();
        }
      }
    });
  }

  // [GET] /rice-price/add-old-posts
  addOldPosts(req, res) {
    let postArray = require("../data/posts.json");

    // check whether a post is in postArray[]
    const checkExisted = (link) => {
      for (let post of postArray) {
        if (post == link) {
          return true;
        }
      }
      return false;
    };

    // get post list from website and save to postArray (if not saved)
    request(urlTopic, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        let postLink;
        let postListOnWeb = [];
        const $ = cheerio.load(html);

        $(".article").each((index, el) => {
          postLink = $(el).find(".article-link").attr("href");
          // postTitle = $(el).find(".article-link").attr("title");

          if (
            postLink.includes(`https://congthuong.vn/gia-lua-gao-hom-nay`) &&
            !checkExisted(postLink)
          ) {
            postListOnWeb.push(postLink);
          }
        });

        postArray = [...postArray, ...postListOnWeb.reverse()];
        fs.writeFileSync("./src/data/posts.json", JSON.stringify(postArray));
      } else {
        console.log("Error from addOldPosts: ", error);
      }
    });

    res.sendStatus(200).end();
  }

  // [GET] /rice-price/add-old-prices
  addOldPrices(req, res) {
    // let postArray = require("../data/posts.json");
    let postArray = [];

    try {
      for (let post of postArray) {
        request(post, (error, response, html) => {
          if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            // get DATE of the post
            const datetime = $(".article-date").text();
            const index = datetime.indexOf(", ") + 2;
            const date = datetime.slice(index, index + 10);

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
                  const excludeRices = ["Tấm khô IR 504", "Cám khô IR 504"];
                  if (rice && !excludeRices.includes(rice)) {
                    const ricePrice = new RicePrice({
                      rice,
                      price,
                      average,
                      date,
                    });
                    ricePrice.save();
                  }
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

    res.sendStatus(200).end();
  }

  // [GET] /rice-price/
  show(req, res) {
    const today = stringifyDate(new Date());
    const yesterday = stringifyDate(new Date(Date.now() - 86400000));

    RicePrice.find({ date: { $in: [today, yesterday] } })
      .then((rices) => {
        // console.log(rice);
        let todayList = [];
        let yesterdayList = [];
        for (let rice of rices) {
          if (rice.date == today) todayList.push(rice);
          else yesterdayList.push(rice);
        }
        if (todayList.length > 0) res.json(todayList).end();
        else if (todayList.length > 0) res.json(yesterdayList).end();
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  }

  // [PUT] /rice-price/update
  async update(req, res) {
    try {
      const urlTodayPost = await getTodayPost();
      console.log("Today's post: ", urlTodayPost);
      await request(urlTodayPost, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          // get DATE of the post
          const datetime = $(".article-date").text();
          const index = datetime.indexOf(", ") + 2;
          const date = datetime.slice(index, index + 10);

          $(".__MASTERCMS_TABLE_DATA tr").first().remove(); // remove heading of table
          $(".__MASTERCMS_TABLE_DATA tr").each((index, el) => {
            let min, max, average;
            const rice = $(el).find("td").find("p").first().text();
            const price = $(el).find("td:nth-child(3)").find("p").text();
            console.log(rice + ": " + price);

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
            const excludeRices = ["Tấm khô IR 504", "Cám khô IR 504"];
            if (rice && !excludeRices.includes(rice)) {
              const ricePrice = new RicePrice({
                rice,
                price,
                average,
                date,
              });
              // console.log(ricePrice);
              ricePrice.save();
            }
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
