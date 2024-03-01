import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
	const token = req.cookies.get("token");

	if (!token) {
		return NextResponse.json({ isSuccess: false, statusCode: 403, message: "Unauthorized" });
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/book(.*)"],
};
