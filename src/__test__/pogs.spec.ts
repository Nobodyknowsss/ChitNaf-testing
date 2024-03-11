import { prisma } from "../../routes";
import supertest from "supertest";
import { app } from "../index";

describe("Pogs API", () => {
  afterEach(async () => {
    await prisma.pog.deleteMany();
  });

  describe("GET /api/pogs", () => {
    it("should return all pogs", async () => {
      await prisma.pog.createMany({
        data: [
          {
            name: "sova",
            ticker_symbol: "darto",
            price: 8000,
            color: "blue ",
          },
          {
            name: "jett",
            ticker_symbol: "updrf",
            price: 999999,
            color: "white",
          },
        ],
      });

      const res = await supertest(app).get("/api/pogs");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe("POST /api/pogs", () => {
    it("should create a new pog", async () => {
      const pogData = {
        name: "Phoenix",
        ticker_symbol: "PHX",
        price: 180,
        color: "orange",
      };

      const res = await supertest(app).post("/api/pogs").send(pogData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toMatchObject(pogData);
    });

    it("should not allow creation of a pog with duplicate ticker symbol", async () => {
      await prisma.pog.create({
        data: {
          name: "Existing Pog",
          ticker_symbol: "PHX",
          price: 100,
          color: "red",
        },
      });

      const duplicatePogData = {
        name: "Duplicate Pog",
        ticker_symbol: "PHX",
        price: 120,
        color: "blue",
      };

      const res = await supertest(app).post("/api/pogs").send(duplicatePogData);

      expect(res.statusCode).toBe(422);
    });
  });

  describe("PATCH /api/pogs/:id", () => {
    it("should update an existing pog", async () => {
      const createdPog = await prisma.pog.create({
        data: {
          name: "Sova",
          ticker_symbol: "DARTO",
          price: 8000,
          color: "blue",
        },
      });
      const updatedPogData = {
        name: "Updated Sova",
        ticker_symbol: "DARTO",
        price: 10000,
        color: "green",
      };

      const res = await supertest(app)
        .patch(`/api/pogs/${createdPog.id}`)
        .send(updatedPogData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toMatchObject(updatedPogData);
    });

    it("should not allow update of a pog with duplicate ticker symbol", async () => {
      const existingPog = await prisma.pog.create({
        data: {
          name: "Existing Pog",
          ticker_symbol: "ExistingTicker",
          price: 150,
          color: "pink",
        },
      });

      await prisma.pog.create({
        data: {
          name: "Another Pog",
          ticker_symbol: "AnotherTicker",
          price: 200,
          color: "blue",
        },
      });

      const duplicateTickerPogData = {
        name: "Duplicate Pog",
        ticker_symbol: "AnotherTicker",
        price: 180,
        color: "orange",
      };

      const res = await supertest(app)
        .patch(`/api/pogs/${existingPog.id}`)
        .send(duplicateTickerPogData);

      expect(res.statusCode).toBe(422);
    });
  });

  describe("DELETE /api/pogs/:id", () => {
    it("should delete an existing pog", async () => {
      const createdPog = await prisma.pog.create({
        data: {
          name: "Sova",
          ticker_symbol: "DARTO",
          price: 8000,
          color: "blue",
        },
      });

      const res = await supertest(app).delete(`/api/pogs/${createdPog.id}`);

      expect(res.statusCode).toBe(204);
      expect(res.body).toEqual({});
    });
  });
});
