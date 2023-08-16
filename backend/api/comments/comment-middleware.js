const commentModels = require("./comment-model");

const checkCommetId = async (req, res, next) => {
  try {
    const isExistValid = await commentModels.getCommentById(req.params.id);
    if (!isExistValid) {
      res
        .status(404)
        .json({ message: `ID No: ${req.params.id} comment not found` });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

const validatePayload = (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ message: `${text} property is missing` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { checkCommetId, validatePayload };
