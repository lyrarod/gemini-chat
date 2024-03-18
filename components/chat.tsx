"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Image from "next/image";
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
    <>
      <div className="sticky top-0 left-0 z-10 flex flex-col items-center justify-center w-full p-4 border-b shadow gap-y-4 bg-background">
        <Image
          src="google-gemini.svg"
          alt=""
          width={100}
          height={100}
          priority
          className="w-full max-w-32 sm:max-w-48"
        />

        <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
          <div className="relative flex w-full">
            <Input
              value={input}
              placeholder={isLoading ? "" : "Say something..."}
              onChange={handleInputChange}
              type="search"
              disabled={isLoading}
              className="flex w-full pr-16 placeholder:italic"
            />
            <Button
              size={"default"}
              variant={"outline"}
              disabled={isLoading || !input.trim()}
              className="absolute right-0 rounded-l-none"
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

      {/* // Response Area */}
      <div className="flex flex-col w-full h-[80vh] max-w-xl mx-auto sm:rounded-b-md sm:border sm:border-t-0 z-0">
        <ScrollArea ref={scrollRef}>
          <ul>
            {messages.map(({ id, role, content }) => {
              const isUser = role === "user";
              const contentTrim = content.trim();

              return (
                <li
                  key={id}
                  className={cn(
                    "flex px-4 py-2.5 text-sm sm:text-base gap-x-2",
                    !isUser && "bg-muted/20"
                  )}
                >
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback
                      className={cn("", isUser && "bg-transparent border")}
                    >
                      {isUser ? <User /> : <BotIcon />}
                    </AvatarFallback>
                  </Avatar>

                  <div className="pt-2.5 sm:pt-2 whitespace-pre-wrap gap-x-1 flex">
                    <strong className="">{isUser ? "User" : "AI"}</strong>
                    {":"}
                    <span>{contentTrim}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </div>
    </>
  );
}
