import { GetBooksResponseType } from "@/types/book";
import client from "@/utils/db";
import { validateToken } from "@/utils/tokenHelper";
import { Book } from "@prisma/client";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

	const bookList: Book[] = books.filter((book) => !userBooks.some((ub) => ub.bookId === book.id));

	if (bookList.length === 0) {
		return NextResponse.json({ isSuccess: false, cMessage: "Unread book not found" });
	}

	const random = Math.floor(Math.random() * bookList.length);

	const response = bookList[random];
	return NextResponse.json({ isSuccess: true, data: response });
}
