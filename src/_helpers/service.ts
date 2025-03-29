import { AppDataSource } from "../_helpers/db";
import { Request, Response, NextFunction } from "express"
import { User } from "../entities/User";
import { UserType, UserUpdate } from "../entities/interface";
import Joi from "joi"
import validateRequest from "../_middlewares/validate-request"


const userRepository = AppDataSource.getRepository(User);

const getAll = async () => {
    return await userRepository.find();
}


const getById = async (id: number) => {
    return await userRepository.findOne({ where: { id } });
}

const create = async (params: UserType) => {
    if (await userRepository.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already taken';
    }
    const user = userRepository.create(params); // Include all fields
    await userRepository.save(user);
};

const update = async (id: number, params: UserUpdate) => {

    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw 'User not found';


    if (params.email && params.email !== user.email) {
        if (await userRepository.findOne({ where: { email: params.email } })) {
            throw 'Email "' + params.email + '" is already taken';
        }
    }

    await userRepository.update(id, { title: params.title, firstName: params.firstName, lastName: params.lastName, email: params.email, role: params.role });
}


const _delete = async (id: number) => {
    await userRepository.delete(id);
}

const createSchema = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid('Admin', 'User').required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    })
    validateRequest(req, next, schema)
}

const updateSchema = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid('Admin', 'User').empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword')
    validateRequest(req, next, schema)
}

export const userService = {
    getAll,
    create,
    delete: _delete,
    getById,
    update
}