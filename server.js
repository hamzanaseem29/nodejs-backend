import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";
import prisma from "./db/db.config.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import cors from 'cors';
import cookieParser from "cookie-parser";
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", () => {
  console.log("Hello from Backend");
});

app.use(routes);
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with:", { email, password });

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    console.log("Admin found:", admin ? "Yes" : "No");
    
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    const passwordMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", passwordMatch);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// **Middleware to Protect Routes**
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.adminId = decoded.adminId;
    next();
  });
};

// **Protected Admin Dashboard**
app.get("/admin/home", authenticate, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

// **Logout**
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
