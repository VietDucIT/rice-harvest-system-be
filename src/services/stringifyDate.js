const stringifyDate = (date) => {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  if (d < 10) d = "0" + d;
  if (m < 10) m = "0" + m;

  return d + "/" + m + "/" + y;
};

module.exports = stringifyDate;
