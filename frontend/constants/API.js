const HOST = NODE_ENV === 'production' ? '/' : 'http://localhost:9002/';

export const API_REQUEST_FETCH_ARTICLES = `${HOST}api/fetchArticles`;
export const API_REQUEST_CREATE_ARTICLE = `${HOST}api/createArticle`;
export const API_REQUEST_USER_AUTH_CHECK = `${HOST}api/userAuthCheck`;
export const API_REQUEST_AUTH = `${HOST}api/auth`;
export const API_REQUEST_REGISTER = `${HOST}api/register`;
export const API_REQUEST_CHAT_MESSAGES = `${HOST}api/chatMessages`;
export const API_REQUEST_FETCH_SINGLE_ARTICLE = (title) => `${HOST}api/fetchArticleById?id=${title}`