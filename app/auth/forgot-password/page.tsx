import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	CardFooter,
	Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { forgotPasswordFun, login } from "@/actions/authActions";
import { Button, buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/components/auth/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function Component({
	searchParams,
}: {
	searchParams: {
		message: string
		error: string
	};
}) {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold">
						Forgot Password
					</CardTitle>
					<CardDescription>
						Enter your email to reset your password.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form action={forgotPasswordFun}>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="m@example.com"
								required
								type="email"
								name="email"
							/>
						</div>
                    <SubmitButton />

					</form>
				</CardContent>
				<CardFooter>
                    <Link 
                        className={buttonVariants({variant: "link"})}
                        href="/auth/login">
                        Already have an account?
                    </Link>
                    {searchParams.error && (
						<Alert variant="destructive">
							<AlertTitle>Error!</AlertTitle>
							<AlertDescription>
								{searchParams.message}
							</AlertDescription>
						</Alert>
					)}
					{searchParams.message && (
						<Alert>
							<AlertTitle>Success!</AlertTitle>
							<AlertDescription>
								{searchParams.message}
							</AlertDescription>
						</Alert>
					)}
                </CardFooter>
			</Card>
		</div>
	);
}
