const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//  Database
connectDB();

//  Middleware
app.use(express.json({ extended: false }));

//  Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/goals", require("./routes/goals"))
// app.use("/api/goals"), require("./routes/goals")
// Public Files
if (process.env.NODE_ENV === "production") {
  // Set static folder -- Expresses way of telling app to use public dir in react app
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
