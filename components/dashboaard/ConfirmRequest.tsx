"use client";
import { checkTestCookie } from "@/actions/actions";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
export default function ConfirmRequest({ code }: { code: string }) {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(true);

	return (
		<AlertDialog open={open}>
			{/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Double confirmation</AlertDialogTitle>
					<AlertDialogDescription>
						Allow the app to interact with and access content on
						behalf of your account.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						disabled={loading}
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={async () => {
							setLoading(true);
							try {
								const test = await checkTestCookie({
                                    code
                                });
								console.log(test);
								if (test.status === "error") {
									console.log("error setting cookie");
								}
							} catch (error) {
								console.error(error);
							} finally {
								setLoading(false);
								setOpen(false);
							}
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
