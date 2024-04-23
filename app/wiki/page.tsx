import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";

interface Root {
  tfa: Tfa;
  mostread: Mostread;
  onthisday: Onthisday[];
}

interface Tfa {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace;
  wikibase_item: string;
  titles: Titles;
  pageid: number;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

interface Namespace {
  id: number;
  text: string;
}

interface Titles {
  canonical: string;
  normalized: string;
  display: string;
}

interface ContentUrls {
  desktop: Desktop;
  mobile: Mobile;
}

interface Desktop {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

interface Mobile {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

interface Mostread {
  date: string;
  articles: Article[];
}

interface Article {
  views: number;
  rank: number;
  view_history: ViewHistory[];
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace2;
  wikibase_item: string;
  titles: Titles2;
  pageid: number;
  thumbnail?: Thumbnail;
  originalimage?: Originalimage;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  content_urls: ContentUrls2;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
  coordinates?: Coordinates;
}

interface ViewHistory {
  date: string;
  views: number;
}

interface Namespace2 {
  id: number;
  text: string;
}

interface Titles2 {
  canonical: string;
  normalized: string;
  display: string;
}

interface Thumbnail {
  source: string;
  width: number;
  height: number;
}

interface Originalimage {
  source: string;
  width: number;
  height: number;
}

interface ContentUrls2 {
  desktop: Desktop2;
  mobile: Mobile2;
}

interface Desktop2 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

interface Mobile2 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface Onthisday {
  text: string;
  pages: Page[];
  year: number;
}

interface Page {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace3;
  wikibase_item: string;
  titles: Titles3;
  pageid: number;
  thumbnail?: Thumbnail2;
  originalimage?: Originalimage2;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description?: string;
  description_source?: string;
  coordinates?: Coordinates2;
  content_urls: ContentUrls3;
  extract: string;
  extract_html: string;
  normalizedtitle: string;
}

interface Namespace3 {
  id: number;
  text: string;
}

interface Titles3 {
  canonical: string;
  normalized: string;
  display: string;
}

interface Thumbnail2 {
  source: string;
  width: number;
  height: number;
}

interface Originalimage2 {
  source: string;
  width: number;
  height: number;
}

interface Coordinates2 {
  lat: number;
  lon: number;
}

interface ContentUrls3 {
  desktop: Desktop3;
  mobile: Mobile3;
}

interface Desktop3 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

interface Mobile3 {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
}

export default async function WikiPage() {
  const url = "https://api.wikimedia.org/feed/v1/wikipedia/en/featured/" + dayjs().format("YYYY/MM/DD");
  const page = await axios.get<Root>(url);
  const article = page.data;

  console.log(article);

  const featuredArticle = article.tfa;
    const mostReadArticles = article.mostread.articles;
    const historicEvents = article.onthisday;
  return (
    <main className="flex flex-col space-y-8 p-6">
    {featuredArticle && (
        <Section title="Featured Article" description="Today's featured article on Wikipedia." cards={[
            { title: featuredArticle.titles.normalized, content: featuredArticle.extract, link: featuredArticle.content_urls.desktop.page }
        ]} />
    )}
    {mostReadArticles.length > 0 && (
        <Section title="Most Read Articles" description="The most popular articles right now." cards={
            mostReadArticles.map(article => ({
                title: article.title,
                content: article.extract,
                link: article.content_urls.desktop.page
            }))
        } />
    )}
    {historicEvents.length > 0 && (
        <Section title="On This Day" description="Historic events on this day." cards={
            historicEvents.flatMap(event => event.pages.map(page => ({
                title: page.title,
                content: page.extract,
                link: page.content_urls.desktop.page
            })))
        } />
    )}
</main>
  )
}

// components/Card.tsx
function Card2({ title, content, link }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <Link className="text-blue-500 hover:underline" href={link}>
            Read more
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // components/Section.tsx
function Section({ title, description, cards }) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-500 mb-4">{description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card2 key={index} {...card} />
          ))}
        </div>
      </section>
    );
  }