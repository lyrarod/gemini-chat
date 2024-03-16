"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  BanIcon,
  BotIcon,
  LoaderIcon,
  SendHorizonalIcon,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-xl h-[500px] border rounded">
      {/* <h1 className="flex justify-center p-4 text-lg font-extrabold tracking-wider uppercase">
        Gemini AI Chatbot
      </h1> */}
      <img
        src="google-gemini.svg"
        alt=""
        className="flex self-center w-full p-4 max-w-32 sm:max-w-48"
      />
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
                  isUser && "dark:bg-secondary/20 bg-primary/10"
                )}
              >
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback
                    className={cn(isUser && "bg-background border-2")}
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
      <form onSubmit={handleSubmit} className="flex w-full p-4 gap-x-0">
        <div className="relative flex w-full">
          <Input
            value={input}
            placeholder={isLoading ? "" : "Say something..."}
            onChange={handleInputChange}
            type="search"
            disabled={isLoading}
            className="flex pr-16 placeholder:italic"
            autoFocus
            ref={inputRef}
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
  );
}
