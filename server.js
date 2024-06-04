import express from "express";
const app = express();
const PORT = 8080;
import fs from "fs";
import cors from "cors";

app.use(cors());
import data from "./data.json" assert { type: "json" };
app.use(express.json({ limit: "50mb", extended: false }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "From the server" });
});

app.post("/image", (req, res) => {
  try {
    const newBooks = req.body;
    console.log(req.body);
    let newData = data;
    newData.books.push(newBooks);
    fs.writeFile("./data.json", JSON.stringify(newData), (err) => {
      if (err) {
        return res.status(201).json({ message: "Error in Custom dbs" });
      }
      return res.status(201).json({ message: "File Received and updated" });
    });
  } catch (error) {
    res.status(201).json({ message: "Server Problem" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to the port http://localhost:${PORT}`);
});
