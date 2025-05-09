"use client";

import { useEffect, useState } from "react";
import { ConversationStats } from "@/components/conversation-stats";
import { ConversationTable } from "@/components/conversation-table";
import { ConversationFilter } from "@/components/conversation-filter";
import { DashboardLayout } from "@/components/dashboard-layout";
import { MessageList } from "@/components/message-list";
import api from "@/_services/api";

export type ConversationStatus = "OPEN" | "CLOSED";

export interface Message {
  id: string;
  content: string;
  direction: "RECEIVED" | "SENT";
  timestamp: string;
}

export interface Conversation {
  id: string;
  state: ConversationStatus;
  created_at: string;
  messages: Message[];
}

export function MessageDashboard() {
  const [filterStates, setFilterStates] = useState<
    ConversationStatus | "todas"
  >("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [conversationSelected, setConversationSelected] =
    useState<Conversation | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>([]);

  const filtredConversations = conversations.filter((conversa) => {
    const correspondeStatus =
      filterStates === "todas" || conversa.state === filterStates;
    const correspondeBusca = searchTerm === "";

    return correspondeStatus && correspondeBusca;
  });

  const totalConversas = conversations.length;
  const openedConversations = conversations.filter(
    (currentConversation) => currentConversation.state === "OPEN"
  ).length;
  const closedConversations = conversations.filter(
    (currentConversation) => currentConversation.state === "CLOSED"
  ).length;

  const downloadConversations = async () => {
    const request = await api<Conversation[]>({
      endpoint: "/conversations/get",
      method: "GET",
      local: true,
    });

    if (request.status) {
      setConversations(request.data);
    }
  };

  useEffect(() => {
    downloadConversations();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <ConversationStats
          total={totalConversas}
          opens={openedConversations}
          closeds={closedConversations}
        />

        <ConversationFilter
          filterStates={filterStates}
          setFilterStates={setFilterStates}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Lista de Conversas</h2>
            <ConversationTable
              conversations={filtredConversations}
              onSelectConversation={setConversationSelected}
              conversationSelectedId={conversationSelected?.id}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">
              {conversationSelected
                ? `Mensagens`
                : "Selecione uma conversa para ver as mensagens"}
            </h2>
            {conversationSelected ? (
              <MessageList messages={conversationSelected.messages} />
            ) : (
              <div className="rounded-md border p-8 text-center text-muted-foreground">
                Selecione uma conversa para visualizar as mensagens
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
