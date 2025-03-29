import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { database } from '../path/to/database'; // Adjust according to your file structure
import { UnitUser } from '../path/to/models/UnitUser'; // Adjust accordingly

// Get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users: UnitUser[] = await database.findAll(); // Ensure this method exists in your database object
        if (users.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "No users found" });
        }
        res.status(StatusCodes.OK).json({ total: users.length, users });
    } catch (error) {
        console.error(error); // For logging the error details
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
});

// Get a single user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const user: UnitUser | null = await database.findOne(req.params.id); // Ensure this method exists in your database object
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }
        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.error(error); // For logging the error details
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
});

// Delete a user by ID
router.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const user: UnitUser | null = await database.findOne(req.params.id); // Ensure this method exists in your database object
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        await database.remove(req.params.id); // Ensure this method exists in your database object
        res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error); // For logging the error details
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error", error: error.message });
    }
});
