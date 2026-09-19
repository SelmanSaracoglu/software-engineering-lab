/*
 * ASYNC, AWAIT AND CONCURRENT WORK
 *
 * async and await provide structured syntax for Promise-based operations.
 * Correct syntax does not automatically create efficient execution: independent
 * operations may run sequentially or concurrently depending on when they start.
 *
 * This lesson covers:
 * - async function return types
 * - awaiting fulfilled values
 * - sequential execution
 * - concurrent execution with Promise.all
 * - result order
 * - choosing concurrency only for independent work
 */

function delayValue<T>(
    value: T,
    delayMs: number,
): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, delayMs);
    });
}

/*
 * SECTION 1
 * async functions return Promises
 */

async function getExpectedStatus(): Promise<number> {
    return 200;
}

const expectedStatusPromise = getExpectedStatus();

console.log(
    'async function returned Promise:',
    expectedStatusPromise instanceof Promise,
);

const expectedStatus = await expectedStatusPromise;

console.log('Expected status:', expectedStatus);

/*
 * Returning 200 from an async function fulfils its Promise with 200. The
 * declared return type is Promise<number>, not number.
 */

/*
 * SECTION 2
 * await pauses the current async flow
 */

async function evaluateDelayedStatus(): Promise<boolean> {
    console.log('Evaluation started');

    const actualStatus = await delayValue(200, 10);

    console.log('Status received:', actualStatus);

    return actualStatus === 200;
}

const delayedStatusResult =
    await evaluateDelayedStatus();

console.log('Delayed status passed:', delayedStatusResult);

/*
 * await pauses this async function, not the entire JavaScript runtime. Other
 * already-started work may continue.
 */

/*
 * SECTION 3
 * Sequential work
 *
 * The second operation starts only after the first one finishes.
 */

async function loadSequentially(): Promise<string[]> {
    const user = await delayValue('user-loaded', 10);
    const orders = await delayValue('orders-loaded', 10);

    return [user, orders];
}

console.log(
    'Sequential results:',
    await loadSequentially(),
);

/*
 * Sequential execution is required when the second operation depends on the
 * first result. Otherwise it may create unnecessary waiting.
 */

/*
 * SECTION 4
 * Concurrent independent work
 *
 * Create both Promises before awaiting them together.
 */

async function loadConcurrently(): Promise<string[]> {
    const userPromise = delayValue('user-loaded', 20);
    const ordersPromise = delayValue('orders-loaded', 5);

    const [user, orders] = await Promise.all([
        userPromise,
        ordersPromise,
    ]);

    return [user, orders];
}

console.log(
    'Concurrent results:',
    await loadConcurrently(),
);

/*
 * orders finishes first, but Promise.all returns results in input order:
 * [user result, orders result].
 */

/*
 * SECTION 5
 * Promise.all rejects when one input rejects
 */

async function loadRequiredData(): Promise<string[]> {
    const profilePromise =
        delayValue('profile-loaded', 5);

    const permissionsPromise: Promise<string> =
        Promise.reject(
            new Error('Permissions unavailable'),
        );

    return Promise.all([
        profilePromise,
        permissionsPromise,
    ]);
}

try {
    await loadRequiredData();
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Required-data error:', error.message);
    }
}

/*
 * Promise.all is appropriate when every result is required. If one rejects,
 * the combined Promise rejects. Already-started operations are not
 * automatically cancelled.
 */

/*
 * APPLICATION
 * Request several status values concurrently
 */

const statusCodes = [200, 201, 204];

const statusPromises = statusCodes.map((statusCode) => {
    return delayValue(statusCode, 5);
});

const receivedStatuses =
    await Promise.all(statusPromises);

console.log('Received statuses:', receivedStatuses);

/*
 * map creates Promise<number>[]. Promise.all converts it into one
 * Promise<number[]>.
 */

/*
 * FINAL SUMMARY
 *
 * async function:
 * Always returns a Promise.
 *
 * await:
 * Waits for one Promise inside the current async flow and produces its value or
 * throws its rejection.
 *
 * Sequential work:
 * Starts a later operation after an earlier awaited operation completes.
 *
 * Concurrent work:
 * Starts independent operations before awaiting them together.
 *
 * Promise.all:
 * Fulfils with results in input order or rejects when one required input
 * rejects.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What does an async function return?
 * A: A Promise, even when its return statement contains a plain value.
 *
 * Q: Does await block the whole JavaScript runtime?
 * A: No. It pauses the current async flow while other work may continue.
 *
 * Q: When should Promise.all be used?
 * A: For independent operations whose results are all required.
 *
 * Q: Does Promise.all return results in completion order?
 * A: No. It preserves the order of its input Promises.
 */
