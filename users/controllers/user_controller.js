import jwt from "jsonwebtoken";
import RegisterEmailJob from "../jobs/register_email_job.js";
import { createUser, getUser, passwordIsMatch } from "../models/user.js";
import { saveToken } from "../models/token.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await getUser({ email });
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
    const user = createUser({ name, email, password });
    await user.save();

    /**
     * Send Email
     */
    new RegisterEmailJob(user.email).queue();

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUser({ email });
    if (!user) {
      return res.status(401).json({ msg: "invalid creadentials" });
    }

    if (!passwordIsMatch(password, user.password)) {
      return res.status(401).json({ msg: "invalid creadentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);


    const savedToken = await saveToken(user._id, token)
    savedToken.save()
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
