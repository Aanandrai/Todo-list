const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signUp controller
exports.SignUp = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, confirmPassword } =
      req.body;

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !firstname ||
      !lastname
    ) {
      return res.json({
        success: false,
        message: "Please fill in all field",
      });
    }

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const oldUser = await userModel.findOne({ email: email });
    if (oldUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new userModel({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      confirmPassword, // Make sure to handle confirmPassword properly in the schema if needed
    });

    // Save the new user to the database
    await newUser.save();

    return res.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

// login controller
exports.Signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (await bcrypt.compareSync(password, user.password)) {
      const payload = {
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      user.password = undefined;

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        secure: true,
      };

      return res.cookie("token", token, option).status(200).json({
        success: true,
        user,
        message: "user login",
      });
    } else {
      return res.json({
        success: false,
        message: "incorrect Password",
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const token = req.cookies.token;

    payload = jwt.verify(token, process.env.JWT_SECRET);

    let user = await userModel.findById(payload.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!bcrypt.compare(user.password, password)) {
      return res.json({
        success: false,
        message: "incorrect password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({
      success: true,
      message: "Password change successfuly",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};
