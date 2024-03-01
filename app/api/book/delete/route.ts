import client from "@/utils/db";
import { validateToken } from "@/utils/tokenHelper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
	const token = cookies().get("token")?.value;

	if (!token) {
		return NextResponse.json({ isSuccess: false, message: "No Token Found" });
	}

	const user = (await validateToken(token)) as { id: string; name: string; surname: string };

	if (!user) {
		return NextResponse.json({ isSuccess: false, message: "User not found" });
	}

	const bookId = request.nextUrl.searchParams.get("bookId");

	if (!bookId) {
		return NextResponse.json({ isSuccess: false, message: "BookId not found" });
	}

	const book = await client.book.findUnique({
		where: {
			id: bookId,
		},
	});

	if (!book) {
		return NextResponse.json({ isSuccess: false, message: "Book not found" });
	}

	await client.userBook.deleteMany({
		where: {
			bookId,
		},
	});

	await client.book.delete({
		where: {
			id: bookId,
		},
	});

	return NextResponse.json({ isSuccess: true });
}
