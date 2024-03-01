"use client";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { CreateUserRequest } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const initialState: CreateUserRequest = {
	name: "",
	password: "",
	surname: "",
	username: "",
};

const LoginPage = () => {
	const [userData, setUserData] = useState<CreateUserRequest>(initialState);
	const [error, setError] = useState<string>("");
	const { login } = useAuthStore();
	const router = useRouter();

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUserData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = async () => {
		setError("");
		if (!userData.username || !userData.password) {
			setError("Please fill all fields");

			return;
		}

		const { data } = await axios.post("/api/user", userData);
		if (!data.isSuccess && data.message) {
			setError(data.message);
		} else if (data.isSuccess) {
			login();
			router.push("/");
		}
	};

	return (
		<Container>
			<Card className="max-w-xl mx-auto mt-14">
				<CardHeader>
					<CardTitle>Create User</CardTitle>
					<CardDescription>Create User to Read Random Books</CardDescription>
				</CardHeader>
				<CardContent>
					{error && <div className="bg-rose-900 text-rose-300 rounded p-2 mb-4">{error}</div>}
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input name="name" id="name" onChange={handleChange} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="surname">Surname</Label>
							<Input name="surname" id="surname" onChange={handleChange} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input name="username" id="username" onChange={handleChange} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input name="password" id="password" onChange={handleChange} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="rptpass">Repeat Password</Label>
							<Input name="rptpass" id="rptpass" type="password" onChange={handleChange} />
						</div>
						<Button onClick={handleSubmit}>REGISTER</Button>
					</div>
				</CardContent>
			</Card>
		</Container>
	);
};

export default LoginPage;
