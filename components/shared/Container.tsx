import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
	className?: string;
};

const Container = ({ children, className }: Props) => {
	return <div className={cn("container", className)}>{children}</div>;
};

export default Container;
