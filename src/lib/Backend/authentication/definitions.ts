import { z } from 'zod';

export const SignupFormSchema = z.object({
  email: z.string().min(1, { message: 'Email cannot be empty' }),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
  newUser: z.boolean().nullable().optional().transform((value) => {
    // Transform null or undefined to false
    return value !== null && value !== undefined ? value : false;
  }).default(false) // Set a default value of false if newUser is missing
});
