import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPage() {
    return (
        <div className="h-screen w-screen">
        <div className="h-full w-full  bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <Skeleton className="w-[300px]" />
        </div>
        </div>
    )
}