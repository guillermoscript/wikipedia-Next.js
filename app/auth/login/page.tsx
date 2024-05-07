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
import { login } from "@/actions/authActions";
import { Button, buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/components/auth/SubmitButton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


export default function Register({
	searchParams,
}: {
	searchParams: {
		message: string;
        error: string;
	};
}) {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1 text-center">
					<CardTitle className="text-2xl font-bold">
						Sign In
					</CardTitle>
					<CardDescription>
						Enter your email and password to access your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form 
                        className="flex flex-col space-y-4"
                        action={login}>
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
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Password</Label>
								<Link 
                                    className={buttonVariants({variant: "link"})}
                                    href="/auth/forgot-password"
                                >
									Forgot password?
								</Link>
							</div>
							<Input
								id="password"
								required
								type="password"
								name="password"
							/>
						</div>
                    <SubmitButton />

					</form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-2">
                    <Link
                        className={buttonVariants({variant: "link"})}
                        href="/auth/register">
                        Create an account
                    </Link>
					{searchParams.message && (
						<Alert>
							<AlertTitle>Message</AlertTitle>
							<AlertDescription>
								{searchParams.message}
							</AlertDescription>
						</Alert>
					)}
                    {searchParams.error && (
                        <Alert variant='destructive'>
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                {searchParams.error}
                            </AlertDescription>
                        </Alert>
                    )}
                </CardFooter>
			</Card>
		</div>
	);
}
