export type ApiResponse<T> = {
	status: "success" | "error" | "idle";
	message: string;
	data?: T;
	error?: any;
};

export function createResponse<T>(
    status: "success" | "error" | "idle",
    message: string,
    data?: T,
    error?: any
): ApiResponse<T> {
    return {
        status,
        message,
        data,
        error,
    };
}
