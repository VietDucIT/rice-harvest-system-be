// To run: node ./src/services/manual/sortPosts.js
const fs = require("fs");

const postList = require("../../data/posts.json");

postList.sort((a, b) => {
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

  return dateA - dateB;
});

fs.writeFileSync("../../data/posts.json", JSON.stringify(postList));

console.log("First post: ", postList[1]);
