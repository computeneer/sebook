import { z } from "zod";

export const createUserValidation = z.object({
	name: z.string().max(31),
	surname: z.string().max(31),
	username: z.string().max(31),
	password: z.string().min(4).max(511),
});

export const loginUserValidation = z.object({
	username: z.string().max(31),
	password: z.string().min(4).max(511),
});
