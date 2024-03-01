import cookie from "cookiejs";

export const getCookie = (key: string) => {
	return cookie.get(key);
};
