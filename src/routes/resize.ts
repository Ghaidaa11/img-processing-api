import express, { Request, Response } from "express";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const Resize = () => {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const inputPath = `src/images/full/${filename}.jpg`;
    const outputPath = path.join(
      process.cwd(),
      "src",
      "images",
      "thump",
      `${filename}_${width}x${height}.jpg`,
    );

    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!fs.existsSync(inputPath)) {
      res.status(404).send("Original image not found");
      return;
    }

    try {
      await sharp(inputPath).resize(width, height).toFile(outputPath);
      res.sendFile(outputPath);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error resizing image");
    }
  });

  return router;
};

export default Resize;
