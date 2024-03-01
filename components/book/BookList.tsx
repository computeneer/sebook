"use client";

import React, { useEffect, useState } from "react";
import Book from "./Book";
import RandomBookButton from "./RandomBookButton";
import axios from "axios";
import { GetBooksResponseType } from "@/types/book";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { Button } from "../ui/button";

function BookList() {
	const [books, setBooks] = useState<GetBooksResponseType[]>([]);
	const { isAuth } = useAuthStore();

	const fetchBooks = async () => {
		const { data } = await axios.get<{ isSuccess: boolean; data: GetBooksResponseType[] }>("/api/book");

		if (data.isSuccess) {
			setBooks(data.data);
		}
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	return (
		<>
			{isAuth && (
				<>
					<div>{books.length > 0 && <RandomBookButton />}</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 py-4">
						{books.map((book) => (
							<Book key={book.id} book={book} setBooks={setBooks} />
						))}
					</div>
				</>
			)}
			{!isAuth && (
				<div className="flex justify-center items-center py-20">
					<Button asChild variant="outline" className="px-12 py-6">
						<Link className="text-2xl " href="/login">
							Login
						</Link>
					</Button>
				</div>
			)}
		</>
	);
}

export default BookList;
