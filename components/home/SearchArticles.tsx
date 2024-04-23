"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader, SearchIcon } from "lucide-react";
import SearchResults from "./SearchResults";
import useDebounce from "@/hooks/useDebounce";


export interface WikipediaSearchResponse {
  batchcomplete: string;
  continue: Continue;
  query: Query;
}

interface Continue {
  sroffset: number;
  continue: string;
}

interface Query {
  searchinfo: Searchinfo;
  search: Search[];
}

interface Searchinfo {
  totalhits: number;
  suggestion: string;
  suggestionsnippet: string;
}

interface Search {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  wordcount: number;
  snippet: string;
  timestamp: string;
}

export async function searchArticles(search: string, sroffset = 0): Promise<WikipediaSearchResponse> {
  // fetch data from wikipedia api
  const url = `https://en.wikipedia.org/w/api.php`;
  const params = new URLSearchParams({
    action: "query",
    srsearch: search,
    format: "json",
    origin: "*",
    list: "search",
    sroffset: `${sroffset}`, // Add offset to API parameters
  });
  const response = await fetch(`${url}?${params}`);
  const data = await response?.json();
  return data;
}

export default function SearchArticles() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchArticles(debouncedSearchTerm, 10 * currentPage)
        .then((data) => {
          setResults(data.query.search);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedSearchTerm, currentPage]);

  return (
    <>
      <div className="relative flex items-center w-full mb-8">
        <SearchIcon className="absolute left-4 h-5 w-5 text-gray-500 dark:text-gray-400" />
        <Input
          className="w-full h-12 pl-12 pr-4 text-lg rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
        />
      {loading && <Loader className="absolute w-10 h-10 top-1 right-5 animate-spin mx-auto " />}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length === 0 && search.length > 0 && !loading && (
          <p className="text-gray-500 dark:text-gray-400">
            No results found for {search}
          </p>
        )}

        {results.map((result, index) => (
          <SearchResults
            key={index}
            title={result.title}
            description={result.snippet}
            url={`/wiki/${result.title}`}
          />
        ))}
      </div>
      {results.length > 0 && (
        <div className="flex justify-center my-6 gap-4">
          <Button
            className="bg-white text-black"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <Button
            className="bg-white text-black"
            onClick={handleNextPage}
            disabled={results.length < 10}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
