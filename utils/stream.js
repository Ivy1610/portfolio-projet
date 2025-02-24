import { StreamChat } from "stream-chat";

const API_KEY = process.env.GETSTREAM_API_KEY;
const API_SECRET = process.env.GETSTREAM_API_SECRET; // Ne pas exposer côté client !

const client = StreamChat.getInstance(API_KEY, API_SECRET);

export default client;
