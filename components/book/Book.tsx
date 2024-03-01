"use client";

import React from "react";
import { Label } from "../ui/label";
import { GetBooksResponseType } from "@/types/book";
import { cn } from "@/lib/utils";
import axios from "axios";

type Props = {
	book: GetBooksResponseType;
	setBooks: React.Dispatch<React.SetStateAction<GetBooksResponseType[]>>;
};

const Book = ({ book, setBooks }: Props) => {
	const handleClick = async () => {
		await axios.post("/api/book/read", {
			bookId: book.id,
		});

		setBooks((prev) =>
			prev.map((b) => {
				if (b.id === book.id) {
					return {
						...b,
						isRead: !book.isRead,
					};
				}
				return b;
			})
		);
	};

	return (
		<div
			onClick={handleClick}
			className={cn("flex items-center justify-center px-12 py-4 border rounded-lg cursor-pointer", {
				"bg-primary": book.isRead,
			})}>
			<Label className="cursor-pointer">{book.title}</Label>
		</div>
	);
};

export default Book;
