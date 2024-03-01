type Book = {
	id: string;
	title: string;
};

export type GetBooksResponseType = Book & {
	isRead: boolean;
};
