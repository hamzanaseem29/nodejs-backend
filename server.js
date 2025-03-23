import "dotenv/config";
import express from "express";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", () => {
  console.log("Hello from Backend");
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
