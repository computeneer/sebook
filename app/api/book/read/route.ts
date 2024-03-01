import client from "@/utils/db";
import { validateToken } from "@/utils/tokenHelper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const token = cookies().get("token")?.value;

	if (!token) {
		return NextResponse.json({ isSuccess: false, message: "No Token Found" });
	}

	const body = await req.json();
	const user = (await validateToken(token)) as { id: string; name: string; surname: string };

	const userBook = await client.userBook.findFirst({
		where: {
			userId: user.id,
			bookId: body.bookId,
		},
	});

	if (!userBook) {
		await client.userBook.create({
			data: {
				bookId: body.bookId,
				userId: user.id,
			},
		});
	} else {
		await client.userBook.delete({
			where: {
				id: userBook.id,
			},
		});
	}

	return NextResponse.json({ isSuccess: true });
}
