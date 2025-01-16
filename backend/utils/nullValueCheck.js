export const areFieldsValid = (obj, fields) => {
  for (let field of fields) {
    if (
      obj[field] === null ||
      obj[field] === undefined ||
      (typeof obj[field] === "string" && obj[field].trim() === "")
    ) {
      return false;
    }
  }
  return true;
};
