import bcrypt from "bcrypt";
import User from "../model/userModel.js";

const register = async (req,res) => {
    const {name, username, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // const newRecord = 
    await User.create(
        { //if inside the object, we can ommit, instaed of name:name and username: username we can just simply put name,username
            name,
            username,
            password: hashedPassword,
        });

    //save session
    // req.session.userId = newRecord._id;

    res.json({
        message: "You are fully registered! Thank you! (:"
    });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  //find the username in db
  const user = await User.findOne({ username });
  if (!user) {
    res.json({ error: "Invalid Credential" });
    return;
  }
  //check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.json({ error: "Invalid Credential" });
    return
  }
  // save info
  req.session.userId = user._id;

  res.json({ message: "Logged in Sucessfully!" });
};

const logout = (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            res.json({error: err.message});
            return;
        }

        res.clearCookie("connect.sid");
    })
}

export { register,login,logout };