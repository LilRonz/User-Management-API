import "reflect-metadata";
import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import { User } from "./entities/User";

const app = express();
app.use(express.json());

createConnection()
  .then(async (connection) => {
    // Create User endpoint
    app.post("/users", async (req: Request, res: Response) => {
      const { name, email, password } = req.body;

      try {
        const userRepository = connection.getRepository(User);

        // In production, ensure you hash the password before storing!
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;

        const savedUser = await userRepository.save(user);

        return res.status(201).json(savedUser);
      } catch (error) {
        console.error("Error creating user: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log("TypeORM connection error: ", error));