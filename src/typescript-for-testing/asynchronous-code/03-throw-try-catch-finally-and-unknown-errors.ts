/*
 * THROW, TRY, CATCH, FINALLY AND UNKNOWN ERRORS
 *
 * Errors change control flow. A function may throw when it cannot fulfil its
 * contract. Callers catch an error only when they can add context, recover, or
 * perform required cleanup.
 *
 * This lesson covers:
 * - throwing Error objects
 * - try and catch
 * - unknown catch values
 * - custom error classes
 * - rethrowing unexpected failures
 * - finally
 * - rejected Promises with async/await
 */

/*
 * SECTION 1
 * Throwing an Error
 */

function requirePositiveTimeout(timeoutMs: number): number {
    if (timeoutMs <= 0) {
        throw new Error('Timeout must be greater than zero');
    }

    return timeoutMs;
}

try {
    console.log('Timeout:', requirePositiveTimeout(-1));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Timeout error:', error.message);
    }
}

/*
 * throw immediately stops the current function call. Statements after throw on
 * that path do not run.
 */

/*
 * SECTION 2
 * Catch values are unknown
 *
 * JavaScript allows throwing any value, not only Error objects. Treat the catch
 * value as unknown and narrow it.
 */

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'Unknown error';
}

try {
    throw 'String failure';
} catch (error: unknown) {
    console.log('Normalised error:', getErrorMessage(error));
}

/*
 * Application code should normally throw Error objects because they carry a
 * message, stack, and runtime identity. The normaliser handles less reliable
 * external code defensively.
 */

/*
 * SECTION 3
 * Custom error type
 */

class ValidationError extends Error {
    constructor(
        message: string,
        public readonly field: string,
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateStatus(statusCode: number): number {
    if (!Number.isInteger(statusCode)) {
        throw new ValidationError(
            'Status code must be an integer',
            'statusCode',
        );
    }

    if (statusCode < 100 || statusCode > 599) {
        throw new ValidationError(
            'Status code is outside the HTTP range',
            'statusCode',
        );
    }

    return statusCode;
}

try {
    validateStatus(999);
} catch (error: unknown) {
    if (error instanceof ValidationError) {
        console.log(
            `Validation failed for ${error.field}:`,
            error.message,
        );
    } else {
        throw error;
    }
}

/*
 * The else branch rethrows an unexpected failure rather than hiding it.
 */

/*
 * SECTION 4
 * finally runs after success or failure
 */

let resourceIsOpen = false;

function useResource(shouldFail: boolean): string {
    resourceIsOpen = true;

    try {
        if (shouldFail) {
            throw new Error('Resource operation failed');
        }

        return 'Resource result';
    } finally {
        resourceIsOpen = false;
        console.log('Resource closed');
    }
}

console.log('Resource success:', useResource(false));
console.log('Resource is open:', resourceIsOpen);

try {
    useResource(true);
} catch (error: unknown) {
    console.log('Resource failure:', getErrorMessage(error));
}

console.log('Resource is open:', resourceIsOpen);

/*
 * finally runs before a return completes and before a thrown error continues to
 * the caller. Avoid returning from finally because it can replace the original
 * return value or hide the error.
 */

/*
 * APPLICATION
 * Handle a rejected request with async and await
 */

async function requestRejectedStatus(): Promise<number> {
    throw new Error('Request was rejected');
}

async function evaluateRequest(): Promise<string> {
    try {
        const statusCode = await requestRejectedStatus();

        return `Received ${statusCode}`;
    } catch (error: unknown) {
        return `Request failed: ${getErrorMessage(error)}`;
    } finally {
        console.log('Async request evaluation finished');
    }
}

console.log(await evaluateRequest());

/*
 * throw inside an async function rejects its returned Promise. await presents
 * that rejection as a thrown value inside the surrounding try block.
 */

/*
 * SECTION 6
 * Catch only when there is a purpose
 *
 * Useful reasons include:
 * - recover with a valid fallback
 * - add meaningful context and rethrow
 * - translate a low-level error into a domain error
 * - record evidence and continue according to an explicit rule
 *
 * Catching an error only to ignore it can turn a real failure into a false
 * success, which is especially dangerous in test automation.
 */

/*
 * FINAL SUMMARY
 *
 * throw:
 * Stops the current path and transfers control to a matching error handler.
 *
 * try/catch:
 * Runs guarded code and handles a thrown value when recovery or context is
 * possible.
 *
 * unknown catch value:
 * Must be narrowed because JavaScript can throw any value.
 *
 * finally:
 * Runs cleanup after success or failure.
 *
 * async error:
 * Throwing rejects the Promise; awaiting a rejection throws at the await point.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why catch an error as unknown?
 * A: JavaScript permits any thrown value, so its structure is not guaranteed.
 *
 * Q: When should an unexpected error be rethrown?
 * A: When the current layer cannot correctly recover or translate it and
 *    hiding it would produce misleading behaviour.
 *
 * Q: What is finally for?
 * A: Cleanup that must run after both success and failure.
 *
 * Q: What happens when an async function throws?
 * A: Its returned Promise rejects with that error.
 */
