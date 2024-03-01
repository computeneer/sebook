"use client";

import { useAuthStore } from "@/stores/authStore";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";

const AuthButton = () => {
	const { isAuth, logout } = useAuthStore();

	const signout = async () => {
		await axios.get("/api/auth/logout");
		logout();
	};

	if (isAuth) {
		return <Button onClick={() => signout()}>Log out</Button>;
	}

	return (
		<Button asChild>
			<Link href="/login">Login</Link>
		</Button>
	);
};

export default AuthButton;
