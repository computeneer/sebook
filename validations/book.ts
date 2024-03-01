import { z } from "zod";

export const createBookValidation = z.object({
	title: z.string().min(1).max(511),
});
