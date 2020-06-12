const { User } = require("../db/models");

module.exports = {
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        res.send({
          code: 404,
          message: `Not found, Can't find user with email: ${email}`,
        });
      }

      const isPasswordTrue = user.checkPassword(password, user.password);

      if (!isPasswordTrue) {
        res.send({
          code: 403,
          message: "Forbidden, Your password is invalid!",
        });
      }

      delete user.dataValues.password;

      const token = user.generateAuthToken(user);

      res.send({
        code: 200,
        message: "success signin",
        data: { user, token },
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error });
    }
  },
};
