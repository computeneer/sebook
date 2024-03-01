export type User = {
	name: string;
	surname: string;
	username: string;
};

export type AuthUser = User & {
	id: string;
};

export type CreateUserRequest = User & {
	password: string;
};

export type LoginUserRequest = {
	username: string;
	password: string;
};
