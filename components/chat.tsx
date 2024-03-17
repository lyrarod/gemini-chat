"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  BanIcon,
  BotIcon,
  LoaderIcon,
  SendHorizonalIcon,
  User,
} from "lucide-react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-xl h-[580px] tall-sm:h-[637px] tall-md:h-[700px] tall-lg:h-[804px] sm:border rounded sm:mt-10">
      <div className="flex flex-col items-center justify-center w-full p-4 border-b shadow gap-y-4">
        <img
          src="google-gemini.svg"
          alt=""
          className="w-full max-w-32 sm:max-w-48"
        />

        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-x-0 sm:static bg-background"
        >
          <div className="relative flex w-full">
            <Input
              value={input}
              placeholder={isLoading ? "" : "Say something..."}
              onChange={handleInputChange}
              type="search"
              disabled={isLoading}
              className="flex pr-16 placeholder:italic"
            />
            <Button
              size={"default"}
              variant={"outline"}
              disabled={isLoading || !input.trim()}
              className="absolute right-0 flex transition rounded-l-none"
            >
              {isLoading && !input.trim() && (
                <LoaderIcon className="animate-spin" />
              )}
              {!isLoading && !input.trim() && <BanIcon />}
              {!isLoading && input.trim() && <SendHorizonalIcon />}
            </Button>
          </div>
        </form>
      </div>

      <ScrollArea className="h-full" ref={scrollRef}>
        <ul>
          {messages.map(({ role, content }, index) => {
            const isUser = role === "user";
            const trimContent = content.trim();

            return (
              <li
                key={index}
                className={cn(
                  "flex px-4 py-2 text-sm sm:text-base gap-x-1.5",
                  !isUser && "bg-muted/25"
                )}
              >
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback
                    className={cn(isUser && "bg-transparent border")}
                  >
                    {isUser ? <User /> : <BotIcon />}
                  </AvatarFallback>
                </Avatar>

                <div className="pt-2.5 sm:pt-2 whitespace-pre-wrap">
                  <strong className="">{isUser ? "User: " : "Gemini: "}</strong>
                  {trimContent}
                </div>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
    </div>
  );
}
