import axios from "axios";
import { ChatContext, ChatSession } from "../types";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
});

const getContexts = () =>
  instance<ChatContext[]>({
    method: "get",
    url: "contexts",
  });

const createSession = (data: { context_id: string }) =>
  instance<ChatSession>({
    method: "post",
    url: "session",
    data,
  });

const createMessage = (data: { session_id: string; content: string }) =>
  instance<ChatSession>({
    method: "post",
    url: "message",
    data,
  });

export { getContexts, createSession, createMessage };
