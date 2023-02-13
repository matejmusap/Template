import mongoose from 'mongoose';

export const database = async (url: string) => {
    await mongoose
        .connect(`${url}`)
        .then(() => {
            console.log('Database connected!');
        })
        .catch((err) => {
            console.log(err);
        });
};
