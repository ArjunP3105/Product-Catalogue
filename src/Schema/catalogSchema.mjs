export const catalogSchema = {
  name: {
    isString: {
      errMessage: "has to be a string ",
    },
    notEmpty: {
      errMessage: "cannot be empty",
    },
  },
  price: {
    isDecimal: {
      errMessage: "has to be a decimal ",
    },
    notEmpty: {
      errMessage: "cannot be empty",
    },
  },
  discount: {
    isDecimal: {
      errMessage: "has to be a decimal ",
    },
    notEmpty: {
      errMessage: "cannot be empty",
    },
  },
  category: {
    isString: {
      errMessage: "has to be a object ",
    },
    notEmpty: {
      errMessage: "cannot be empty",
    },
  },
};
