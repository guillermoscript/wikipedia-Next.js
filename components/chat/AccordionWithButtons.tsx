import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChatRequestOptions, Message } from "ai";

const AccordionWithButtons = ({
  data,
  setMessages,
  reload,
  articleTitle,
  articleContent,
}: {
  data: { title: string; content: string[] }[];
  setMessages: (messages: Message[]) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  articleTitle: string;
  articleContent: string;
}) => (
  <Accordion type="single" collapsible>
    {data.map((item, index) => (
      <AccordionItem value={`item-${index}`} key={index}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent className="w-fit">
          {item.content.map((buttonText, buttonIndex) => (
            <Button
              className="rounded-full border"
              size="sm"
              variant="ghost"
              onClick={() => {
                setMessages([
                  {
                    role: "system",
                    content: `You are a expert in ${articleTitle}. This is the wikipedia article: ${articleContent}`,
                    id: "1",
                  },
                  {
                    role: "user",
                    content: buttonText,
                    id: "2",
                  },
                ]);
                reload();
              }}
              key={buttonIndex}
            >
              {buttonText}
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default AccordionWithButtons;
