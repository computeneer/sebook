import client from "@/utils/db";
import { generateToken } from "@/utils/tokenHelper";
import { createUserValidation } from "@/validations/user";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const validation = await createUserValidation.safeParseAsync(body);

	if (!validation.success) {
		return Response.json({ isSuccess: false, message: "Validation Error" });
	}

	const canRegister =
		(await client.user.count({
			where: {
				username: body.username,
			},
		})) === 0;

	if (!canRegister) {
		return Response.json({ isSuccess: false, message: "User Already Exists" });
	}

	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(body.password, salt);

	const createdUser = await client.user.create({
		data: {
			name: body.name,
			passwordHash: hashedPassword,
			passwordSalt: salt,
			surname: body.surname,
			username: body.username,
		},
	});

	const token = await generateToken({
		id: createdUser.id,
		name: createdUser.name,
		surname: createdUser.surname,
		username: createdUser.username,
	});

	cookies().set("token", token);

	return Response.json({ isSuccess: true, data: token });
}
