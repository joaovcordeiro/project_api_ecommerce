import express, { json } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json" assert { type: "json" };
import "express-async-errors";
import dotenv from "dotenv";
import router from "./routers/index.js";
import cors from "cors";
import errorHandlingMiddleware from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use(errorHandlingMiddleware);

export default app;
