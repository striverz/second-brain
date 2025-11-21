const ValidationTypes = (type) => {
  const isValidType = ["image", "video", "article", "audio"];
  if (isValidType.includes(type)) return true;
  else return false;
};

module.exports = {
  ValidationTypes,
};
