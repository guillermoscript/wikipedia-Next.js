import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, "");
}
export default function SearchResults({
  title,
  description,
  url,
  children,
}: {
  title: string;
  description: string;
  url: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={url}
      className="hover:underline cursor-pointer"
      target="_blank"
      rel="noopener noreferrer"
    >
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {children}
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {" "}
          {stripHtml(description)} {/* Stripping HTML here */}
        </p>
        <p className="text-blue-500 hover:underline">
          Read more
        </p>
      </CardContent>
    </Card>
    </Link>
  );
}
