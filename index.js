import express from "express";
import morgan from "morgan";
import cors from "cors";
import { requestLogger, unknownEndpoint } from "./utils/customMiddleware.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

//custom morgan token
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

//Inicializate app
const app = express();
app.use(fileUpload({
  createParentPath: true
}));
app.use(cors());
//MIDDLEWARES
app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);
app.use(morgan(":method :url :status :response-time ms :body"));

app.get("/test", (req, res) => {
  // res.sendFile(path.join(__dirname, "../dist/index.html"));
  // res.status(200).send("Hello World");
  console.log(__dirname + "\\dist\\index.html")
  res.json({ message: "Hello World" });
  // res.sendFile(__dirname + "\\dist\\index.html");
});

app.get("/api/constant", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});
app.use(unknownEndpoint);
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});