import "reflect-metadata";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";

const app = express();
app.use(express.json());

createConnection()
  .then(async (connection) => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));