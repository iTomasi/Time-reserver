import express from "express";
import cors from "cors";
import routePages from "./routes/pages";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/", routePages);

app.listen(port, () => console.log(`SV ON PORT ${port}`))