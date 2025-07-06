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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("../routes/resize"));
const supertest_1 = __importDefault(require("supertest"));
const app = (0, express_1.default)();
app.use('/api/images', (0, resize_1.default)());
describe("test the api api/images", () => {
    const fullImagePath = path_1.default.join(process.cwd(), 'src', 'images', 'full', 'lion.jpg');
    beforeAll(() => {
        if (!fs_1.default.existsSync(fullImagePath)) {
            throw new Error('Test image does not exist: ' + fullImagePath);
        }
    });
    it("the image is returned successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/api/images').query({ filename: "lion", height: '250', width: '250' });
        expect(res.status).toBe(200);
    }));
    it("the server is returning 500 if the image not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/api/images').query({ filename: "nothing", height: '250', width: '250' });
        expect(res.status).toBe(404);
        expect(res.text).toContain('Original image not found');
    }));
});
