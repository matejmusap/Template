import { NextFunction, Request, Response } from 'express';
import User from '../../models/User';
import { ValidateLogin } from '../../types';
import { jwtHandler, managePassword } from '../../utils';

const login = async (req: Request, res: Response, _next: NextFunction) => {
    const body: ValidateLogin = req.body;
    try {
        const user = (await User.findOne({email: body.email}));
        if(user) {
            const checkPassword = await managePassword.comparePassword(
                body.password as string,
                user.password as string
            );
            if (!checkPassword) {
                return res.status(400).send({
                    data: {},
                    code: 400,
                    message: 'Wrong password!'
                });
            }

            const token = await jwtHandler.generateToken(user._id);
    
            res.set('Authorization', `Bearer ${token}`);
            return res.status(200).send({
                data: {},
                code: 200,
                message: 'You are Logged in!'
            });
        }
        return res.status(400).send({
            data: {},
            code: 401,
            message: 'No user with provided credentials!'
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            data: {},
            code: 400,
            message: 'Something happened on Login!'
        });
    }
};

export default login;
