require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("./prismaClient");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend Running");
});

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Register
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      income: {
        create: {
          amount: 25000,
        },
      },
    },
  });

  res.json({
    message: "User registered successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// GET income
app.get("/api/income", authMiddleware, async (req, res) => {
  const income = await prisma.income.findUnique({
    where: { userId: req.userId },
  });

  res.json(income || { amount: 25000 });
});

// ADD / UPDATE income
app.post("/api/income", authMiddleware, async (req, res) => {
  const { amount } = req.body;

  const income = await prisma.income.upsert({
    where: { userId: req.userId },
    update: { amount: Number(amount) },
    create: {
      amount: Number(amount),
      userId: req.userId,
    },
  });

  res.json(income);
});

// GET all expenses
app.get("/api/expenses", authMiddleware, async (req, res) => {
  const expenses = await prisma.expense.findMany({
    where: { userId: req.userId },
    orderBy: { id: "desc" },
  });

  res.json(expenses);
});

// ADD expense
app.post("/api/expenses", authMiddleware, async (req, res) => {
  const { title, amount, category } = req.body;

  const expense = await prisma.expense.create({
    data: {
      title,
      amount: Number(amount),
      category,
      userId: req.userId,
    },
  });

  res.json(expense);
});

// UPDATE expense
app.put("/api/expenses/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, amount, category } = req.body;

  const expense = await prisma.expense.updateMany({
    where: {
      id: Number(id),
      userId: req.userId,
    },
    data: {
      title,
      amount: Number(amount),
      category,
    },
  });

  res.json(expense);
});

// DELETE expense
app.delete("/api/expenses/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  await prisma.expense.deleteMany({
    where: {
      id: Number(id),
      userId: req.userId,
    },
  });

  res.json({ message: "Expense deleted successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});