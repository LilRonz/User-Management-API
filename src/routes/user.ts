//This is for the creation User()
import { User } from "../entities/User";

//get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users : UnitUser[] = await database.findAll();
        if (!users.length) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "No users found" });
            return;
        }
        res.status(StatusCodes.OK).json({ total: users.length, users });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
    }
});

router.post("/users", async (req: Request, res: Response) => {
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



//deletion
router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const user = await database.findOne(req.params.id);
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
            return;
        }

        await database.remove(req.params.id);
        res.status(StatusCodes.OK).json({ message: "User deleted" });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
    }
});