import { api } from "./client";
import type {
  ApiConversationListItem,
  ApiConversationDetail,
  ApiMessageWithSender,
} from "./types";

export async function getConversations(): Promise<{
  conversations: ApiConversationListItem[];
}> {
  return api.get("/conversations");
}

export async function getConversation(
  id: string
): Promise<ApiConversationDetail> {
  return api.get(`/conversations/${id}`);
}

export async function sendMessage(
  conversationId: string,
  text: string
): Promise<ApiMessageWithSender> {
  return api.post(`/conversations/${conversationId}/messages`, { text });
}

export async function markAsRead(conversationId: string): Promise<void> {
  return api.patch(`/conversations/${conversationId}/read`);
}
