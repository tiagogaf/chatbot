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

const closeSession = (session_id: string) =>
  instance<ChatSession>({
    method: "post",
    url: `session/${session_id}`,
  });

const createMessage = (data: { session_id: string; content: string }) =>
  instance<ChatSession>({
    method: "post",
    url: "message",
    data,
  });

const editMessage = (data: { id: string; content: string }) =>
  instance<ChatSession>({
    method: "put",
    url: "message",
    data,
  });

const deleteMessage = (message_id: string) =>
  instance<ChatSession>({
    method: "delete",
    url: `message/${message_id}`,
  });

export {
  getContexts,
  createSession,
  closeSession,
  createMessage,
  editMessage,
  deleteMessage,
};
