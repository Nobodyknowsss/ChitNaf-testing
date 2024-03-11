import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export default function routes(app: Express): void {
  app.post("/api/pogs", async (req: Request, res: Response) => {
    try {
      const { name, ticker_symbol, price, color } = req.body;
      const createdPog = await prisma.pog.create({
        data: { name, ticker_symbol, price, color },
      });
      res.status(201).json(createdPog);
    } catch (error) {
      console.error(error);
      res.status(422).json({ error: "Failed to create pog" });
    }
  });

  app.get("/api/pogs", async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      const pogs = id
        ? await prisma.pog.findUnique({
            where: { id: parseInt(id as string) },
          })
        : await prisma.pog.findMany();

      if (!pogs) {
        res.status(404).json({ error: "Pog not found" });
      } else {
        res.json(pogs);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/pogs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, ticker_symbol, price, color } = req.body;
      const updatedPog = await prisma.pog.update({
        where: { id: parseInt(id) },
        data: { name, ticker_symbol, price, color },
      });
      res.json(updatedPog);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Pog not found" });
    }
  });

  app.delete("/api/pogs/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.pog.delete({ where: { id: parseInt(id) } });
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Pog not found" });
    }
  });
}
