import SearchArticles from "@/components/home/SearchArticles";
import SemanticSearch from "@/components/home/SemanticSearch";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Next.js Wikipedia
          </h1>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Search articles from Wikipedia with Next.js and Tailwind CSS
          </p>
        </div>
        <Tabs
          defaultValue="simple"
          className="px-6 py-4 w-full container max-h-[80vh] overflow-y-auto z-10"
        >
          <TabsList className="flex w-fit space-x-4 p-4 mx-auto">
            <TabsTrigger value="simple">Simple Search</TabsTrigger>
            <TabsTrigger value="semantic">AI Semantic Search</TabsTrigger>
          </TabsList>
          <TabsContent value="simple">
            <SearchArticles />
          </TabsContent>
          <TabsContent value="semantic">
            <SemanticSearch />
          </TabsContent>
        </Tabs>
      </div>
      <BackgroundBeams />
    </div>
  );
}
