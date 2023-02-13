import { z } from 'zod';

const ROLES = ["Admin", "Editor", "Guest"] as const;

const registerBody = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    fullName:  z.string().optional(),
    alias:  z.string().optional(),
    role: z.enum(ROLES).default("Guest")
});

export type ValidateRegister = z.infer<typeof registerBody>;

const loginBody = z.object({
    email: z.string().email(),
    password: z.string()
});

export type ValidateLogin = z.infer<typeof loginBody>;
