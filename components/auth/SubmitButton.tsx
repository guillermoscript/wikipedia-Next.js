"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export default function SubmitButton() {
    const { pending } = useFormStatus()
	return (
		<Button
            disabled={pending}
            className="w-full" type="submit">
			{pending ? "Loading..." : "Submit"}
		</Button>
	);
}
