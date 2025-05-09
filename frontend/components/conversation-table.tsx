"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Conversation } from "./message-dashboard";
import { formatDate } from "@/_services/utils";

interface ConversationTableProps {
  conversations: Conversation[];
  onSelectConversation: (conversa: Conversation) => void;
  conversationSelectedId?: string;
}

export function ConversationTable({
  conversations,
  onSelectConversation,
  conversationSelectedId,
}: ConversationTableProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id da conversa</TableHead>
            <TableHead>Início da conversa</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {conversations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                Nenhuma conversa encontrada.
              </TableCell>
            </TableRow>
          ) : (
            conversations.map((conversation) => (
              <TableRow
                key={conversation.id}
                className={`cursor-pointer hover:bg-muted/50 ${
                  conversationSelectedId === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => onSelectConversation(conversation)}
              >
                <TableCell className="font-medium">{conversation.id}</TableCell>
                <TableCell>{formatDate(conversation.created_at)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      conversation.state === "OPEN" ? "default" : "secondary"
                    }
                    className={
                      conversation.state === "OPEN"
                        ? "bg-emerald-500 hover:bg-emerald-600"
                        : "bg-gray-500 hover:bg-gray-600"
                    }
                  >
                    {conversation.state === "OPEN" ? "Aberta" : "Fechada"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
