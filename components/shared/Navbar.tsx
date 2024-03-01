"use client";

import React, { useEffect } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Container from "./Container";
import AuthButton from "./AuthButton";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { getCookie } from "@/utils/cookieHelper";

const Navbar = () => {
	const { isAuth, login } = useAuthStore();

	useEffect(() => {
		if (getCookie("token")) {
			login();
		}
	}, []);
	return (
		<div className="py-4 bg-gradient-to-br border-b-2 dark:to-rose-300 dark:via-stone-800 dark:from-black">
			<Container className="flex items-center justify-between">
				<nav className="space-x-7">
					<Link href="/">Home</Link>
					{isAuth && <Link href="/book/create">Add Book</Link>}
					{isAuth && <Link href="/book/delete">Delete Book</Link>}
				</nav>
				<div className="flex items-center gap-5">
					<ThemeSwitcher />
					<AuthButton />
				</div>
			</Container>
		</div>
	);
};

export default Navbar;
