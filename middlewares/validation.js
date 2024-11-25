const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// const validateURL = (value, helpers) => {
//   if (validator.isURL(value)) {
//     return value;
//   }
//   return helpers.error("string.uri");
// };

const validateId = (value, helpers) => {
  if (validator.isHexadecimal(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// const validateItemBody = celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().required().min(2).max(30).messages({
//       "string-min": 'The minimum length of the "name" field is 2',
//       "string-max": 'The maximum length of the "name" field is 30',
//       "string-uri": 'The "name" field must be filled in',
//     }),

//     imageUrl: Joi.string().required().custom(validateURL).messages({
//       "string.empty": 'The "imageUrl" field must be filled in',
//       "string.uri": 'the "imageUrl" field must be a valid url',
//     }),
//     weather: Joi.string().required().valid("hot", "warm", "cold").messages({
//       "string.empty": 'The "weather" field must be filled in',
//     }),
//   }),
// });

const validateUserBody = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string-min": 'The minimum length of the "username" field is 2',
      "string-max": 'The maximum length of the "username" field is 30',
      "string-uri": "The username field is required",
    }),
    email: Joi.string()
      .required()
      .email()
      .message("Must be a valid email")
      .messages({
        "string-empty": "Email field is required",
      }),
    password: Joi.string().required().messages({
      "string-empty": "Password field is required",
    }),
    confirm: Joi.string().required().messages({
      "string-empty": "Password field is required",
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message("Must be a valid email")
      .messages({
        "string-empty": "Email field is required",
      }),
    password: Joi.string().required().messages({
      "string-empty": "Password field is required",
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).required().custom(validateId).messages({
      "string.uri": "Must be a hexadecimal value length of 24 characters",
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string-min": 'The minimum length of the "username" field is 2',
      "string-max": 'The maximum length of the "username" field is 30',
      "string-uri": "The username field is required",
    }),
  }),
});

module.exports = {
  // validateItemBody,
  validateUserBody,
  validateLogin,
  validateUserId,
  validateUserUpdate,
};
