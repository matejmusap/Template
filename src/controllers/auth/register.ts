import { NextFunction, Request, Response } from 'express';
import User from '../../models/User';
import { jwtHandler, managePassword } from '../../utils';

const register = async (req: Request, res: Response, _next: NextFunction) => {
    const body = req.body;
    try {
        const userCheck = await User.findOne({email: body.email});
        if (userCheck) {
            const hashedPassword = await managePassword.hashPassword(body.password as string);
            const user = await User.create(body, hashedPassword);
            const token = await jwtHandler.generateToken(user[0]._id);
            res.set('Authorization', `Bearer ${token}`);
            return res.status(201).send({
                data: {},
                code: 200,
                message: 'You are Registred in by Email!'
            });
        } else {
            return res.status(400).send({
                data: {},
                code: 400,
                message: 'User is alredy registred!'
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on Registration!'
        });
    }
};

export default register;
