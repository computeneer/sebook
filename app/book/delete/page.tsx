"use client";

import LoginPage from "@/app/login/page";
import DeleteBookItem from "@/components/book/DeleteBookItem";
import Container from "@/components/shared/Container";
import { useAuthStore } from "@/stores/authStore";
import { GetBooksResponseType } from "@/types/book";
import axios from "axios";
import React, { useEffect, useState } from "react";

const DeleteBook = () => {
	const [books, setBooks] = useState<GetBooksResponseType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const { isAuth } = useAuthStore();

	const fetchBooks = async () => {
		setLoading(true);
		const { data } = await axios.get<{ isSuccess: boolean; data: GetBooksResponseType[] }>("/api/book");

		if (data.isSuccess) {
			setBooks(data.data);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchBooks();
	}, []);

	if (!isAuth) {
		return <LoginPage redirect="/book/delete" />;
	}

	return (
		<Container>
			{loading && <div className="bg-red-500"></div>}
			{!loading && books.length > 0 && (
				<>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-3 mt-2">
						{books.map((book) => (
							<DeleteBookItem key={book.id} book={book} setBooks={setBooks} />
						))}
					</div>
				</>
			)}
		</Container>
	);
};

export default DeleteBook;
