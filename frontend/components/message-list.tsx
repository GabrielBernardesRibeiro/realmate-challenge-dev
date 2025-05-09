import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message } from "./message-dashboard";
import { formatDate } from "@/_services/utils";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="rounded-md border h-[500px] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.direction == "SENT" && "flex-row-reverse"
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {message.direction == "RECEIVED" ? "Cl" : "SUP"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-1 w-10/12">
                <div
                  className={`flex items-center gap-2 ${
                    message.direction == "SENT" && "flex-row-reverse"
                  }`}
                >
                  <span className="text-xs text-muted-foreground">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
                <div className="rounded-md bg-muted p-3 text-sm ">
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
