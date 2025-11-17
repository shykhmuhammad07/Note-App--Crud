import express from "express";
import mongoose from "./Config/config.js";
import { userModel, todoModel } from "./Config/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://note-app-crud-i4x4.vercel.app/", 
    credentials: true,
  })
);
const SECRET = process.env.SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token found" });

    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

app.get("/auth/check", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const decode = jwt.verify(token, SECRET); // ✅ token variable use karein
    res.json({ loggedIn: true, userId: decode.id });
  } catch (error) {
    res.json({ loggedIn: false });
  }
});


app.get("/", (req, res) => {
  res.send(new Date().toLocaleString());
});

app.post("/auth/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already registered" });

    const hidepass = await bcrypt.hash(password, 10);
    const user = new userModel({ username, email, password: hidepass });
    await user.save();

    res.status(201).json({ msg: "Signup Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Signup failed", error: error.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const isSame = await bcrypt.compare(password.trim(), user.password);
    if (!isSame) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/notes", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    const newTodo = await todoModel.create({
      text,
      userId: req.userId,
    });

    res.status(200).json({
      msg: "Note Created successfully",
      data: newTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error Creating Note", error: error.message });
  }
});

app.get("/notes", verifyToken, async (req, res) => {
  try {
    const notes = await todoModel.find({
      userId: req.userId,
    });
    res.status(200).json({ msg: "Notes fetched successfully", data: notes });
    console.log(req.userId);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching notes", error: error.message });
  }
});

app.patch("/notes/:id", verifyToken, async (req, res) => {
  try {
    const updateNote = await todoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ msg: "Updated Successfully", data: updateNote });
  } catch (error) {
    res.status(500).json({ msg: "error updating note", error: error });
  }
});

app.delete("/notes/:id", verifyToken, async (req, res) => {
  try {
    const deleteNote = await todoModel.findByIdAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleteNote) {
      return res.status(404).json({ msg: "Note not found or unauthorized" });
    }
    res
      .status(200)
      .json({ msg: "Note deleted succesffully", data: deleteNote });
  } catch (error) {
    res.status(500).json({ msg: "error deleting notes", error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server is running on 5000");
});

mongoose.connection.on("open", () => {
  console.log("DataBase Connected");
});

mongoose.connection.on("error", () => {
  console.log("DataBase Error");
});
