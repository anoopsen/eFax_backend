import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import {DBConn} from "./DB/connection.js";
import cors from "cors";
import roleRoutes from "./mvc/efax/routers.js";
import { generatePDF} from './helpers/puppeteer.js'
import DocumentsObject from './doa/efax.js'

import ErrorHandler from "./middlewares/errorHandler.js";

dotenv.config({ path: ".env" });

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./mvc/efax/routes/*.js"], // files containing annotations as
};

const app = express();
app.use(cors());
app.use(express.json());

DBConn();

app.use("/efax", roleRoutes);

app.get('/generate-pdf', async (req, res) => {
  try {
    // const data = await fetchDataFromDatabase();
    await DocumentsObject.getUsers(null, async(err, data, message) => {
      const pdfBuffer = await generatePDF(data);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
      res.send(pdfBuffer);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

app.use(ErrorHandler);

const PORT = process.env.PORT || 5000;

const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(PORT, () => {
  console.log(`Server is running on port number ${PORT}`);
});
