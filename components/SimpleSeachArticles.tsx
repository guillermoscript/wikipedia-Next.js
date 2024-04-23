"use client";
import { useEffect, useState } from "react";
import { Loader, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";
import Link from "next/link";

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
export interface Root {
  pages: Page[];
}

export interface Page {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  matched_title: any;
  description: string;
  thumbnail?: Thumbnail;
}

export interface Thumbnail {
  mimetype: string;
  width: number;
  height: number;
  duration: any;
  url: string;
}

async function searchArticles(
  search: string,
  sroffset = 0,
  callback: (data: Root) => void
): Promise<Root> {
  // fetch data from wikipedia api
  const url = `https://en.wikipedia.org/w/rest.php/v1/search/title`;
  const params = new URLSearchParams({
    q: search,
    limit: "10",
    offset: `${sroffset}`, // Add offset to API parameters
  });
  const response = await fetch(`${url}?${params}`);
  const data = await response?.json();
  callback(data);
  return data;
}

export default function SimpleSearchArticles() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Page[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = () => {
    // Your custom logic here
    console.log("clicked outside");
    setIsDropdownVisible(false);
  };

  const handleClickInside = () => {
    // Your custom logic here
    console.log("clicked inside");
    setIsDropdownVisible(true);
  };

  useOnClickOutside(ref, handleClickOutside);

  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchArticles(debouncedSearchTerm, 0, (data) => {
        setResults(data.pages);
        setLoading(false);
      });
    } else {
      setResults([]);
      setIsDropdownVisible(false);
    }
  }, [debouncedSearchTerm]);

  return (
    <div ref={ref}  className="relative w-full">
      <div className="flex items-center w-full relative">
        <Input
          className="w-full pl-12 h-12 pr-4 text-lg rounded-full shadow focus:outline-none"
          value={search}
          placeholder="Search articles"
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownVisible(true);
          }}
          onFocus={() => setIsDropdownVisible(true)}
          id="search"
          type="search"
        />
        <SearchIcon className="absolute left-4 h-5 w-5 text-gray-500 dark:text-gray-400" />
        {loading && (
            <Loader className="w-10 h-10 absolute right-5 animate-spin mx-auto my-3" />
        )}
        {isDropdownVisible && results.length > 0 && (
          <div className="absolute top-0 w-full mt-12 bg-primary-foreground shadow-lg rounded-md max-h-60 overflow-auto z-10">
            {results.map((item) => (
              <Link
                key={item.id}
                href={`/wiki/${item.title}`}
                onClick={() => setIsDropdownVisible(false)}
                className="flex p-2 hover:bg-primary/10 cursor-pointer"
              >
                {item.thumbnail && (
                  <img
                    src={item.thumbnail.url}
                    alt=""
                    className="h-16 w-16 mr-4 object-contain"
                  />
                )}
                <div>
                  <div className="font-bold">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="absolute top-0 w-full mt-12 bg-primary-foreground shadow-lg rounded-md max-h-60 overflow-auto z-10">
          {results.length === 0 && search.length > 0 && !loading && (
            <p className="text-gray-500 dark:text-gray-400">
              No results found for {search}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
