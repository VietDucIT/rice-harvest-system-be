const normalizeVietnamese = (vietnameseText) => {
  const lowserCase = vietnameseText.toLowerCase().trim();
  const replaceA = lowserCase.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, "a");
  const replaceD = replaceA.replace(/[đ]/g, "d");
  const replaceE = replaceD.replace(/[éèẻẽẹêếềểễệ]/g, "e");
  const replaceI = replaceE.replace(/[íìỉĩị]/g, "i");
  const replaceO = replaceI.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o");
  const replaceU = replaceO.replace(/[úùủũụưứừửữự]/g, "u");
  const replaceY = replaceU.replace(/[ýỳỷỹỵ]/g, "y");
  return replaceY;
};

module.exports = normalizeVietnamese;
