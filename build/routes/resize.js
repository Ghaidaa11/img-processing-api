"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Resize = () => {
    const router = express_1.default.Router();
    router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const filename = req.query.filename;
        const width = parseInt(req.query.width);
        const height = parseInt(req.query.height);
        const inputPath = `src/images/full/${filename}.jpg`;
        const outputPath = path_1.default.join(process.cwd(), "src", "images", "thump", `${filename}_${width}x${height}.jpg`);
        const outputDir = path_1.default.dirname(outputPath);
        if (!fs_1.default.existsSync(outputDir)) {
            fs_1.default.mkdirSync(outputDir, { recursive: true });
        }
        if (!fs_1.default.existsSync(inputPath)) {
            res.status(404).send("Original image not found");
            return;
        }
        try {
            yield (0, sharp_1.default)(inputPath).resize(width, height).toFile(outputPath);
            res.sendFile(outputPath);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Error resizing image");
        }
    }));
    return router;
};
exports.default = Resize;
