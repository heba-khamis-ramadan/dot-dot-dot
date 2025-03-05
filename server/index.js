import express from "express";
import cors from "cors";
import bootstrap from "./src/app.controller.js";

const app = express();
const port = process.env.PORT || 3000;

bootstrap(app, express, cors);

app.listen(port, () => {
    console.log("server is runing on port:", port);
});