"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./routes/resize"));
const port = 3000;
const app = (0, express_1.default)();
app.use('/api/images', (0, resize_1.default)());
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
