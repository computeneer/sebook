"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Book } from "@prisma/client";
import axios from "axios";
import { Label } from "../ui/label";

const RandomBookButton = () => {
	const [selectedBook, setSelectedBook] = useState<Book | null>(null);
	const [error, setError] = useState<string>("");
	const getRandomBook = async () => {
		setError("");
		const { data } = await axios.get<{ isSuccess: boolean; data: Book; cMessage?: string }>("/api/book/random");

		if (data.isSuccess) {
			setSelectedBook(data.data);
		} else if (data.cMessage) {
			setError(data.cMessage);
		}
	};
	return (
		<>
			{error && (
				<div className="flex flex-col gap-3 justify-center items-center py-4 my-5 border rounded relative border-red-400 bg-rose-800 text-rose-200">
					<Label>{error}</Label>
					<Button variant="outline" onClick={() => setError("")} className="absolute right-8">
						Close
					</Button>
				</div>
			)}
			{selectedBook && (
				<div className="flex flex-col gap-3 justify-center items-center py-4 my-5 border rounded relative">
					<span className="text-secondary-foreground text-2xl uppercase">{selectedBook.title}</span>
					<Button variant="link" asChild>
						<a href="https://www.youtube.com/watch?v=QiZNSzWIaLo" target="_blank">
							YOU ARE THE CHOSEN ONE...
						</a>
					</Button>
					<Button variant={"secondary"} onClick={() => setSelectedBook(null)} className="absolute right-8">
						Close
					</Button>
				</div>
			)}
			{!selectedBook && (
				<div className="flex justify-center">
					<Button onClick={getRandomBook} className="mt-4">
						Get Random Book
					</Button>
				</div>
			)}
		</>
	);
};

export default RandomBookButton;
