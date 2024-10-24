import express from "express";
import { createAdvert, getAllAdverts } from "./controller/Advert.controller";
import { prisma } from "./db";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 4000;

const corsOptions = {
  origin: process.env.FRONT_END_URL || "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.post("/api/", createAdvert);
app.get("/api/all", getAllAdverts);
app.get("/api/info", getAllAdverts);

app.listen(port, async () => {
  console.log(await prisma.$queryRaw`SELECT 1`);
  console.log(`Example app listening on port ${port}`);
});
