import { z } from "zod";

export const RegisterSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});