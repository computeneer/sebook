import { AuthUser } from "@/types/user";
import Jwt from "jsonwebtoken";

export const generateToken = async (data: AuthUser) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error("NO SECRET FOUND");
	}
	return Jwt.sign(data, secret, {
		expiresIn: "7d",
	});
};

export const validateToken = async (token: string) => {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		return Response.redirect("/login");
	}

	return Jwt.verify(token, secret);
};
