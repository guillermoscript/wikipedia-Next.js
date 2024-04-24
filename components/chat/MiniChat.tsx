"use client";
import { ChevronDown, ChevronUp, MenuIcon } from "lucide-react";
import { Button } from "../ui/button";

import { useChat } from "ai/react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccordionWithButtons from "./AccordionWithButtons";
import { questionsToAsk } from "@/lib/const";
import { ChatRequestOptions, Message } from "ai";

type Props = {
  articleTitle: string;
  articleId: number;
  articleUrl: string;
  articleContent: string;
};

export default function MiniChat({
  articleTitle,
  articleId,
  articleUrl,
  articleContent,
}: Props) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    setMessages,
    reload,
    isLoading,
    error,
  } = useChat({
    // initialMessages and setup here
  });
  const [isOpen, setIsOpen] = useState(true);

  // Toggle function for opening/closing chat
  const toggleChat = () => setIsOpen(!isOpen);

  // om esc key press close the chat
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-lg w-full lg:max-w-2xl rounded-lg border border-gray-200 bg-primary-foreground shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? "h-auto" : "h-16"
      } overflow-hidden`}
    >
      {/* Header section with toggle button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b dark:bg-gray-900">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
          ChatGPT
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleChat}
            className="p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <MenuIcon className="w-5 h-5 " />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={"right"}
              className="w-[400px] sm:w-[540px] lg:w-[640px] xl:w-[720px]"
            >
              <SheetHeader>
                <SheetTitle>
                  More Questions to ask depending on the topic
                </SheetTitle>
                <SheetDescription>
                  Click on the question to ask the assistant
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-20vh)]">
                <AccordionWithButtons
                  data={questionsToAsk(articleTitle)}
                  setMessages={setMessages}
                  reload={reload}
                  articleTitle={articleTitle}
                  articleContent={articleContent}
                />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Content (Conditionally rendered based on the state) */}
      {isOpen && (
        <div className="p-4 space-y-4 ">
          {/* Existing chat UI and content logic here */}
          {messages.length === 0 && (
            <div className="p-4 space-y-4 overflow-auto max-h-[calc(100vh-4rem)] ">
              <div className="flex flex-wrap items-center gap-2">
              <MessageButton 
                userMessage="Give me a summary of the article: "
                articleTitle={articleTitle}
                articleContent={articleContent}
                setMessages={setMessages}
                reload={reload}
              />
              <MessageButton 
                userMessage="Give me the key points of the article: "
                articleTitle={articleTitle}
                articleContent={articleContent}
                setMessages={setMessages}
                reload={reload}
              />
              <MessageButton 
                userMessage="How do I cite the article: "
                articleTitle={articleTitle}
                articleContent={articleContent}
                setMessages={setMessages}
                reload={reload}
                />
              <MessageButton 
                userMessage="Can you explain the article: "
                articleTitle={articleTitle}
                articleContent={articleContent}
                setMessages={setMessages}
                reload={reload}
              />
              </div>
            </div>
          )}
          {/* Messages list and Textarea form for chat input */}
          <div className="space-y-4 overflow-auto max-h-[calc(60vh-4rem)]">
            {messages.map((m) => (
              <div key={m.id} className="whitespace-pre-wrap ">
                {m.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="bg-blue-600 rounded-lg p-3 text-white text-sm">
                      {m.content}
                    </div>
                  </div>
                ) : m.role === "assistant" ? (
                  <div className="bg-gray-200 rounded-lg p-3 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    {m.content}
                  </div>
                ) : null}
              </div>
            ))}
            {error && (
              <div className="bg-red-500 text-white p-2 rounded-lg">
                {error.message}
              </div>
            )}
          </div>
          <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
            <Textarea
              className="w-full h-12 p-2 border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            <Button disabled={isLoading} type="submit">
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

function MessageButton({
  userMessage,
  articleTitle,
  articleContent,
  setMessages,
  reload,
}: {
  userMessage: string;
  articleTitle: string;
  articleContent: string;
  setMessages: (messages: Message[]) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}) {
  return (
    <Button
      onClick={() => {
        // Add a message to the chat
        setMessages([
          {
            role: "system",
            content: `You are a expert in ${articleTitle}. This is the wikipedia article: ${articleContent}`,
            id: "1",
          },
          {
            role: "user",
            content: `${userMessage}${articleTitle}`,
            id: "2",
          },
        ]);
        reload();
      }}
      className="rounded-full border"
      size="sm"
      variant="ghost"
    >
      {userMessage}{articleTitle}
    </Button>
  );
}