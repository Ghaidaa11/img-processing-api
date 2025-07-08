import path from "path";
import fs from "fs";
import express from "express";
import Resize from "../routes/resize";
import request from "supertest";

const app = express();
app.use("/api/images", Resize());

describe("test the api api/images", () => {
  const fullImagePath = path.join(
    process.cwd(),
    "src",
    "images",
    "full",
    "lion.jpg",
  );

  beforeAll(() => {
    if (!fs.existsSync(fullImagePath)) {
      throw new Error("Test image does not exist: " + fullImagePath);
    }
  });

  it("the image is returned successfully", async () => {
    const res = await request(app)
      .get("/api/images")
      .query({ filename: "lion", height: "250", width: "250" });
    expect(res.status).toBe(200);
  });

  it("the server is returning 500 if the image not found", async () => {
    const res = await request(app)
      .get("/api/images")
      .query({ filename: "nothing", height: "250", width: "250" });
    expect(res.status).toBe(404);
    expect(res.text).toContain("Original image not found");
  });
});
