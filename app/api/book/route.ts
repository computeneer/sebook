import { GetBooksResponseType } from "@/types/book";
import client from "@/utils/db";
import { validateToken } from "@/utils/tokenHelper";
import { createBookValidation } from "@/validations/book";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
	const token = cookies().get("token")?.value;

	if (!token) {
		return NextResponse.json({ isSuccess: false, message: "No Token Found" });
	}

	const user = (await validateToken(token)) as { id: string; name: string; surname: string };

	const books = await client.book.findMany();

	const userBooks = await client.userBook.findMany({
		where: {
			userId: user.id,
		},
	});

	const response: GetBooksResponseType[] = books.map((book) => ({
		...book,
		isRead: userBooks.some((ub) => ub.bookId === book.id),
	}));

	return NextResponse.json({ isSuccess: true, data: response });
}

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = await createBookValidation.safeParseAsync(body);

	if (!validation.success) {
		return NextResponse.json({ isSuccess: false, message: "Validation Error" });
	}

	const response = await client.book.create({
		data: {
			title: body.title,
		},
	});

	return NextResponse.json({ isSuccess: true, data: response });
}
