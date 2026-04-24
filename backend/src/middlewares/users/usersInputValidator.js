import Joi from "joi";

const userShema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(8).email().required(),
  sername: Joi.string().min(3),
  password: Joi.string().min(5).required(),
});

export const validaUser = (req, res, next) => {
  const { error } = userShema.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ""),
    });
  next();
};
