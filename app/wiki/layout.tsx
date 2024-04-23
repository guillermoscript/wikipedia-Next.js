import Header from "@/components/Header";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

export default function ArticlesLayouts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center ">
      <Header />
      {children}
      <ScrollToTopButton />
    </div>
  );
}
