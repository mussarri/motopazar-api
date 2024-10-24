import { prisma } from "../db";

export const createAdvert = async (req, res) => {
  const data = req.body;
  try {
    await prisma.advert.create({
      data,
    });
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("error");
  }
};

export const getAllAdverts = async (req, res) => {
  try {
    await prisma.advert.findMany();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("error");
  }
};
