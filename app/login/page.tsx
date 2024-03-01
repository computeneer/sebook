"use client";

import Container from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { LoginUserRequest } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";

const initialState: LoginUserRequest = {
	password: "",
	username: "",
};

type LoginProps = {
	redirect?: string;
};

const LoginPage: React.FC<LoginProps> = ({ redirect }) => {
	const [userData, setUserData] = useState<LoginUserRequest>(initialState);
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

		const { data } = await axios.post("/api/auth/login", userData);
		if (!data.isSuccess && data.message) {
			setError(data.message);
		} else if (data.isSuccess) {
			const to = redirect || "/";
			login();
			router.push(to);
		}
	};

	return (
		<Container>
			<Card className="max-w-xl mx-auto mt-14">
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>Login to Read Random Books</CardDescription>
				</CardHeader>
				<CardContent>
					{error && <div className="bg-rose-900 text-rose-300 rounded p-2 mb-4">{error}</div>}
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input value={userData.username} name="username" id="username" onChange={handleChange} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								value={userData.password}
								name="password"
								type="password"
								id="password"
								onChange={handleChange}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<Button asChild variant="link">
								<Link href="/register">{"Don't have account? Let's register"}</Link>
							</Button>
							<Button onClick={handleSubmit}>Login</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</Container>
	);
};

export default LoginPage;
