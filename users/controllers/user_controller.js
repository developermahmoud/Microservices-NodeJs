import UserRegisterEmail from "../mails/user_register_email.js";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(422).json([
        {
          type: "field",
          value: email,
          msg: "Email already exists",
          path: "email",
          location: "body",
        },
      ]);
    }
    const user = new User({ name, email, password });
    await user.save();

    /**
     * Send Email
     */
    new UserRegisterEmail(user.email).queue()

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
