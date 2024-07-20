import { CustomError } from "./custom-error-handler";

export function handleError(e: unknown) {
    if (e instanceof CustomError) {
        throw new CustomError(e.message, e.statusCode);
    } else if (e instanceof Error) {
        throw new Error(`signUp failed: ${e.message}`);
    } else {
        throw new Error("signUp failed due to an unknown error");
    }
}