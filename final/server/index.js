import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cors from "cors";

dotenv.config();

const app = express();


let MONGO_URI= 'mongodb://localhost:27017'
// db
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB ERROR => ", err));

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.use(express.static('build'))

app.get('*', (req,res) =>{
  res.sendFile('index.html', {root: 'build'});
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Node server is running on port ${port}`);
});
