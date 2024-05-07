import { MenuIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import SimpleSearchArticles from "./SimpleSeachArticles";
import { DarkThemeToggle } from "./DarkThemeToggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Header() {
	const supabase = createClient();

	// Check if a user's logged in
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<header className="w-full shadow md:relative sticky top-0 z-50 bg-primary-foreground ">
			<div className="container mx-auto flex items-center justify-between py-4 px-8 gap-4">
				<div className="flex items-center gap-4 ">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<MenuIcon className="text-gray-700 h-6 w-6 cursor-pointer" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>
								{user ? "My Account" : "Account"}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{user ? (
								<DropdownMenuItem>
									<Link href="/dashboard/">
										Dashboard
									</Link>
								</DropdownMenuItem>
							) : (
								<>
									<DropdownMenuItem>
										<Link href="/auth/login">Login</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<Link href="/auth/register">
											Register
										</Link>
									</DropdownMenuItem>
								</>
							)}
							<DropdownMenuGroup className="block md:hidden">
								<Helper />
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>

					<h1 className="text-2xl font-bold md:w-52 my-0 ">
						<Link href="/">Next.js Wikipedia</Link>
					</h1>
				</div>
				<div className="flex items-center space-x-4 w-full">
					<div className="relative w-full ">
						<SimpleSearchArticles />
					</div>
					<div className="items-center space-x-4 hidden md:flex">
						<Helper />
					</div>
				</div>
			</div>
		</header>
	);
}

function Helper() {
	return (
		<>
			<Select>
				<SelectTrigger aria-label="Languages" id="languages">
					<SelectValue placeholder="EN" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="en">English</SelectItem>
					<SelectItem value="es">Spanish</SelectItem>
					<SelectItem value="fr">French</SelectItem>
				</SelectContent>
			</Select>
			<DarkThemeToggle />
		</>
	);
}
