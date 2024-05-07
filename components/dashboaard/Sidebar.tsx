import {
	BookIcon,
	HomeIcon,
	LayoutGridIcon,
	ClipboardIcon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SidebarLink from "./SidebarLink";


const Sidebar = ({
	children
}: {
	children?: React.ReactNode;
}) => {
	return (
		<div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
			<div className="flex h-full max-h-screen flex-col gap-2">
				<div className="flex h-[60px] items-center border-b px-6">
					<Link
						className="flex items-center gap-2 font-semibold"
						href="#"
					>
						<BookIcon className="h-6 w-6" />
						<span>
							Next.js Wikipedia
						</span>
					</Link>
					<Button
						className="ml-auto h-8 w-8"
						size="icon"
						variant="outline"
					>
						<BookIcon className="h-4 w-4" />
						<span className="sr-only">Toggle notifications</span>
					</Button>
				</div>
				<nav className="flex-1 overflow-auto py-2 px-4 text-sm font-medium">
					{/* Links */}
					<SidebarLink icon={HomeIcon} text="Dashboard" href="/dashboard" />					
					{children}
				</nav>
			</div>
		</div>
	);
};



export default Sidebar;
