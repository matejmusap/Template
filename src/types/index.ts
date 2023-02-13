import { z } from 'zod';

const registerBody = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
});

export type ValidateRegister = z.infer<typeof registerBody>;

const loginBody = z.object({
    email: z.string().email(),
    password: z.string()
});

export type ValidateLogin = z.infer<typeof loginBody>;
