

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

router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user : UnitUser | null = await database.findOne(req.params.id);
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
            return;
        }
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error });
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