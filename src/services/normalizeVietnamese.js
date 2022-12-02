const normalizeVietnamese = (vietnameseText) => {
  const lowserCase = vietnameseText.toLowerCase().trim();
  const replaceA = lowserCase.replace(/[áàảãạâấầẩẫậăắằẳẵặ]/g, "a");
  const replaceD = replaceA.replace(/[dđ]/g, "d");
  const replaceE = replaceD.replace(/[éèẻẽẹêếềểễệ]/g, "e");
  const replaceI = replaceE.replace(/[íìỉĩị]/g, "i");
  const replaceY = replaceI.replace(/[ýỳỷỹỵ]/g, "y");
  const replaceO = replaceY.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o");
  const replaceU = replaceO.replace(/[úùủũụưứừửữự]/g, "u");
  return replaceU;
};

module.exports = normalizeVietnamese;
