
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import axios from "axios";
import ArticleContent from "@/components/article/ArticleContent";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import MiniChat from "@/components/chat/MiniChat";
import { convert } from 'html-to-text';
import jsdom from "jsdom";

const { JSDOM } = jsdom;


function cleanWikipediaHTML(htmlString: string) {
  // Parse the HTML string into a DOM object
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  // Remove all img elements
  document.querySelectorAll('img').forEach(img => img.remove());

  // Remove all table elements
  document.querySelectorAll('table').forEach(table => table.remove());

  // Remove all elements in classes that typically contain non-essential info
  document.querySelectorAll('.reference, .mw-editsection').forEach(elem => elem.remove());

  // Remove the References section completely
    const references = document.getElementById("References") || document.querySelector('.references');
    if (references) {
      references.remove(); // This removes the reference section along with its contents
    }

    // Extract cleaned text content
    let textContent = "";
    
    // Gather text from paragraphs within the content area, skipping non-content paragraphs
    document.querySelectorAll('.mw-parser-output > p').forEach(p => {
      textContent += p.textContent + '\n';
    });

  return textContent.trim();
}



const SidebarSection = ({ section }: { section: Section }) => (
  <li>
    <Link
      href={`#${section.anchor}`}
      className="hover:text-blue-600 focus:text-blue-600"
    >
      {section.line}
    </Link>
  </li>
);

interface Root {
  parse: Parse;
}

interface Parse {
  title: string;
  pageid: number;
  revid: number;
  text: Text;
  langlinks: Langlink[];
  categories: Category[];
  links: Link[];
  templates: Template[];
  images: string[];
  externallinks: string[];
  sections: Section[];
  showtoc: string;
  parsewarnings: any[];
  displaytitle: string;
  iwlinks: Iwlink[];
  properties: Property[];
}

interface Text {
  "*": string;
}

interface Langlink {
  lang: string;
  url: string;
  langname: string;
  autonym: string;
  "*": string;
}

interface Category {
  sortkey: string;
  hidden?: string;
  "*": string;
}

interface Link {
  ns: number;
  exists: string;
  "*": string;
}

interface Template {
  ns: number;
  exists: string;
  "*": string;
}

interface Section {
  toclevel: number;
  level: string;
  line: string;
  number: string;
  index: string;
  fromtitle: string;
  byteoffset: number;
  anchor: string;
  linkAnchor: string;
}

interface Iwlink {
  prefix: string;
  url: string;
  "*": string;
}

interface Property {
  name: string;
  "*": string;
}

const ArticleBreadcrumb = ({ title }: { title: string }) => (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Articles</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={`/wiki/${title}`}>{title}</BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

export default async function ArticlePage({
  params,
}: {
  params: { articleTitle: string };
}) {
  const url =
    "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      origin: "*",
      action: "parse",
      page: decodeURIComponent(params.articleTitle),
      format: "json",
    });
  const page = await axios.get<Root>(url);
  const article = page.data.parse;

  // grab al lthe content of the text but remove anything that its an image, is after the id  or is a table
  // const onlyTextContent = article.text["*"].replace(/<img[^>]*>/g, "").replace(/<table[^>]*>/g, "").replace(/<td[^>]*>/g, "");
  const cleanedContent = cleanWikipediaHTML(article.text["*"]);

  return (
    <div className="container mx-auto flex flex-col gap-3 md:flex-row py-8 px-4">
      <aside className="w-full md:w-1/4 md:pr-8 relative">
        <div className="sticky top-4 space-y-2">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <h3
                  className="text-lg font-semibold text-gray-600"
                  >Internal Links</h3>
                <ul>
                  {article.sections.map((section, index) => (
                    <SidebarSection key={index} section={section} />
                  ))}
                </ul>
                <h3
                  className="text-lg font-semibold text-gray-600"
                  >External Links</h3>
                <ul>
                  {article.externallinks.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noreferrer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </aside>
      <main className="w-full md:w-3/4">
        <ArticleBreadcrumb title={article.title} />
        <h2 className="text-4xl font-bold mt-4 mb-2">{article.title}</h2>
        <article>
          <ArticleContent article={article.text["*"]} />
        </article>
      </main>
      <MiniChat 
        articleTitle={article.title}
        articleId={article.pageid}
        articleUrl={`https://en.wikipedia.org/?curid=${article.pageid}`}
        articleContent={cleanedContent}
      />
    </div>
  );
}
