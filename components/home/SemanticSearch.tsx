"use client";

import { Loader, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  SemanticSearchAction,
  SemanticSearchActionActionResponse,
} from "@/actions/homeActions";
import { Button } from "../ui/button";
import SearchResults from "./SearchResults";
import { Card, CardContent } from "../ui/card";

export default function SemanticSearch() {

  const [search, setSearch] = useState<string>("");
  const [state, action] = useFormState(SemanticSearchAction, {
    status: "idle",
    message: "",
    error: null,
  });

  // on enter key press submit the form
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // add data to a FormData object
      const formData = new FormData();
      formData.append("search", search);
      action(formData);
    }
  };

  console.log(state.data)

  return (
    <>
      <form action={action}>
        <div className="relative flex items-center w-full mb-8">
          <SubmitButton />
          <Input
            className="w-full h-12 pl-12 pr-4 text-lg rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            name="search"
            id="search"
          />
        </div>
      </form>
      {state.status === "error" && (
        <p className="text-red-500 dark:text-red-400">{state.message}</p>
      )}
      {state.status === "success" && state?.data && (
        <div className="flex flex-col gap-4">
          <p className="text-gray-200 dark:text-gray-400">
            {state.data &&
              (state.data as SemanticSearchActionActionResponse).sumary}
          </p>
          <Card>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(state.data as SemanticSearchActionActionResponse).data.map(
                  (result, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 dark:bg-gray-700 p-4 rounded-lg"
                    >
                      <h5 className="text-gray-200">
                        Articles from {result?.title}
                      </h5>
                      {result?.response?.search?.map((search, index) => (
                          <SearchResults
                            key={index}
                            title={search.title}
                            description={search?.snippet}
                            url={`/wiki/${search.title}`}
                          />
                      ))}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        className="absolute hover:bg-transparent rounded-l-full "
        type="submit"
        variant={"ghost"}
        disabled={pending}
      >
        {pending ? (
        <Loader className="absolute w-10 h-10 left-0 animate-spin mx-auto " />
        ) : (
          <SearchIcon className=" h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </Button>
    </>
  );
}
