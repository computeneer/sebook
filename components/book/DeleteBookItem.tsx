"use client";

import { GetBooksResponseType } from "@/types/book";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { CheckIcon, TrashIcon } from "@radix-ui/react-icons";
import axios from "axios";

type Props = {
	book: GetBooksResponseType;
	setBooks: React.Dispatch<React.SetStateAction<GetBooksResponseType[]>>;
};

const DeleteBookItem = ({ book, setBooks }: Props) => {
	const [status, setStatus] = useState<boolean>(false);

	const handleClick = async () => {
		if (!status) {
			setStatus(true);
			return;
		}

		const { data } = await axios.delete(`/api/book/delete?bookId=${book.id}`);

		if (data.isSuccess) {
			setBooks((prev) => prev.filter((b) => b.id !== book.id));
		}
	};

	return (
		<div className={cn("flex border px-4 py-2 justify-between items-center", { "bg-primary/50": book.isRead })}>
			<Label>{book.title}</Label>
			<Button variant="destructive" onClick={handleClick}>
				{status ? <CheckIcon /> : <TrashIcon />}
			</Button>
		</div>
	);
};

export default DeleteBookItem;
