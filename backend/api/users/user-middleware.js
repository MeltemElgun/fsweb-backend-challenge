const UserModels = require("./user-modele");

const userIdCheck = async (req, res, next) => {
  try {
    const existUserId = await UserModels.getUserById(req.params.userId);
    if (!existUserId) {
      res
        .status(404)
        .json({ message: `ID No: ${req.params.userId} user is not found` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userIdCheck,
};
