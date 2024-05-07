import ConfirmRequest from "@/components/dashboaard/ConfirmRequest";
import { cookies } from "next/headers";

export default async function DashboardPage({
	searchParams,
}: {
	searchParams: {
		code?: string;
	};
}) {
	const cookieStore = cookies();
	const hasCookie = cookieStore.has("wiki_access_token");

	console.log(hasCookie);

	console.log(searchParams?.code);

	if (searchParams?.code && hasCookie === false) {
		return <ConfirmRequest code={searchParams.code} />;
	}

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
}
