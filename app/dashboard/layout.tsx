import DashboardHeader from "@/components/dashboaard/DashboardHeader";
import Sidebar from "@/components/dashboaard/Sidebar";
import SidebarLink from "@/components/dashboaard/SidebarLink";
import { PanelTopCloseIcon } from "lucide-react";
import { cookies } from "next/headers";

export default function LayoutPage({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies();
	const hasCookie = cookieStore.has("wiki_access_token");

	return (
		<div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
			<Sidebar>
				{!hasCookie && (
					<SidebarLink
						icon={PanelTopCloseIcon}
						text="Authorize with Wikipedia"
						href={`https://meta.wikimedia.org/w/rest.php/oauth2/authorize?client_id=${process.env.WIKI_CLIENT_ID}&response_type=code`}
					/>
				)}
			</Sidebar>
			<div className="flex flex-col">
				<DashboardHeader />
				<main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
					{children}
				</main>
			</div>
		</div>
	);
}
