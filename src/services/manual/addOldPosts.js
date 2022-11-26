// To run: node ./src/services/manual/addOldPosts.js
const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

let postArray = require("../../data/posts.json");

const urlTopic = "https://congthuong.vn/chu-de/gia-lua-gao-hom-nay.topic"; // &s_cond=&BRSR=10

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
