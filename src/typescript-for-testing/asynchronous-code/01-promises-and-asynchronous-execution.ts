/*
 * PROMISES AND ASYNCHRONOUS EXECUTION
 *
 * Network requests, timers, file operations, and browser commands may finish
 * after the current synchronous code. A Promise represents the future outcome
 * of one asynchronous operation.
 *
 * This lesson covers:
 * - synchronous versus asynchronous execution
 * - Promise states
 * - creating and returning a Promise
 * - then, catch, and finally
 * - resolved values and rejected reasons
 * - why a Promise is not its eventual value
 */

/*
 * SECTION 1
 * A Promise is not the resolved value
 */

const statusPromise: Promise<number> =
    Promise.resolve(200);

console.log('Promise object:', statusPromise);

const resolvedStatus = await statusPromise;

console.log('Resolved status:', resolvedStatus);

/*
 * statusPromise is Promise<number>. The awaited result is number. Code must
 * wait through await or register a callback before using the future number.
 */

/*
 * SECTION 2
 * Execution order
 */

console.log('1. synchronous start');

const immediatePromise = Promise.resolve('3. promise callback');

immediatePromise.then((message) => {
    console.log(message);
});

console.log('2. synchronous end');

await immediatePromise;

/*
 * Even an already resolved Promise schedules its then callback after the
 * current synchronous work. The output order is 1, 2, 3.
 */

/*
 * SECTION 3
 * Creating an asynchronous Promise
 */

function requestStatus(
    statusCode: number,
    delayMs: number,
): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(statusCode);
        }, delayMs);
    });
}

console.log('Before requestStatus');

const requestedStatusPromise = requestStatus(201, 10);

console.log('After starting requestStatus');

const requestedStatus = await requestedStatusPromise;

console.log('Requested status:', requestedStatus);

/*
 * A Promise begins pending, then settles once as fulfilled or rejected. Calling
 * resolve fulfils this Promise with a number.
 */

/*
 * SECTION 4
 * Transforming a value with then
 */

const statusCheckPromise = requestStatus(204, 10)
    .then((actualStatus) => {
        return actualStatus === 204;
    });

const statusCheckResult = await statusCheckPromise;

console.log('Status check result:', statusCheckResult);

/*
 * then returns a new Promise. Because the callback returns boolean,
 * statusCheckPromise has type Promise<boolean>.
 */

/*
 * APPLICATION
 * Handle and recover from an asynchronous request failure
 */

function requestFailure(): Promise<number> {
    return Promise.reject(
        new Error('Connection failed'),
    );
}

const recoveredStatus = await requestFailure()
    .catch((error: unknown) => {
        if (error instanceof Error) {
            console.log('Request error:', error.message);
        }

        return 503;
    });

console.log('Recovered status:', recoveredStatus);

/*
 * catch handles a rejection and can return a recovery value. If it returns
 * 503, the new Promise fulfils with 503.
 */

/*
 * SECTION 6
 * finally
 */

let requestIsRunning = true;

const finalStatus = await requestStatus(200, 10)
    .finally(() => {
        requestIsRunning = false;
        console.log('Request cleanup finished');
    });

console.log('Final status:', finalStatus);
console.log('Request is running:', requestIsRunning);

/*
 * finally runs after fulfilment or rejection and normally does not replace the
 * settled value. It is appropriate for cleanup, not for deciding success.
 */

/*
 * FINAL SUMMARY
 *
 * Promise:
 * Represents one future fulfilled value or rejection.
 *
 * pending:
 * The operation has not settled yet.
 *
 * fulfilled:
 * The operation completed with a value.
 *
 * rejected:
 * The operation completed with a failure reason.
 *
 * then:
 * Registers fulfilment work and returns a new Promise.
 *
 * catch:
 * Handles rejection and may recover with another value.
 *
 * finally:
 * Runs cleanup after either outcome.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Is Promise<number> a number?
 * A: No. It represents a future number. The number is available after awaiting
 *    it or inside a fulfilment callback.
 *
 * Q: What states can a Promise have?
 * A: It begins pending and settles once as fulfilled or rejected.
 *
 * Q: What does then return?
 * A: A new Promise whose outcome comes from the callback's returned value or
 *    thrown error.
 *
 * Q: When should finally be used?
 * A: For cleanup that must run after success or failure, such as resetting a
 *    loading flag or releasing a resource.
 */
