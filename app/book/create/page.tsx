"use client";

import LoginPage from "@/app/login/page";
import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { ShadowIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React, { useRef, useState } from "react";

type Props = {};

const CreateBook = () => {
	const [title, setTitle] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const { isAuth } = useAuthStore();

	const handleSubmit = async () => {
		setLoading(true);
		if (!title || title.trim() === "") {
			setLoading(false);
			return;
		}
		const { data } = await axios.post("/api/book", {
			title,
		});

		if (data.isSuccess) {
			setTitle("");
		}

		setLoading(false);
		inputRef.current?.focus();
	};

	if (!isAuth) {
		return <LoginPage redirect="/book/create" />;
	}

	return (
		<Container className="py-4 max-w-xl">
			<Card>
				<CardHeader>
					<CardTitle>Create Book</CardTitle>
					<CardDescription>Add Book to Your Library</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col space-y-4">
						<div className="space-y-2">
							<Label>Book Title</Label>
							<Input
								value={title}
								ref={inputRef}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										handleSubmit();
									}
								}}
								onChange={(event) => setTitle(event.target.value)}
							/>
						</div>
						<Button disabled={loading} onClick={handleSubmit}>
							{loading ? <ShadowIcon className="animate-spin" /> : "Add to library"}
						</Button>
					</div>
				</CardContent>
			</Card>
		</Container>
	);
};

export default CreateBook;
