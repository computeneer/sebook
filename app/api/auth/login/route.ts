import client from "@/utils/db";
import { loginUserValidation } from "@/validations/user";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/utils/tokenHelper";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const validation = await loginUserValidation.safeParseAsync(body);

	if (!validation.success) {
		return Response.json({ isSucess: false, message: "Validation Error" });
	}

	const isUserNotExists =
		(await client.user.count({
			where: {
				username: body.username,
			},
		})) === 0;

	if (isUserNotExists) {
		return Response.json({ isSuccess: false, message: "User not found" });
	}

	const user = await client.user.findUnique({
		where: {
			username: body.username,
		},
	});

	if (!user) {
		return Response.json({ isSuccess: false, message: "User not found" });
	}

	const response = await bcrypt.compare(body.password, user.passwordHash);

	if (!response) {
		return Response.json({ isSuccess: false, message: "User not found" });
	}

	const token = await generateToken({
		id: user.id,
		name: user.name,
		surname: user.surname,
		username: user.username,
	});

	cookies().set("token", token);

	return Response.json({ isSuccess: true, token: token });
}
