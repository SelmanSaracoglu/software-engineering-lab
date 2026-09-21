/*
 * UNIT TESTING WITH VITEST
 * THIRD TEST SUITE: ASYNCHRONOUS FUNCTIONS
 *
 * An asynchronous test must wait for the Promise it is verifying. Vitest can
 * observe a fulfilled Promise with resolves and a rejected Promise with
 * rejects. Direct await is useful when several assertions need the result.
 */

import { describe, expect, it } from 'vitest';

import {
    checkPaymentStatus,
    PaymentStatusCheckError,
} from './03-payment-status-check.js';

import type { LoadPaymentStatus } from './03-payment-status-check.js';

const CHECKED_AT_MS = Date.parse('2026-09-21T10:00:00.000Z');

function confirmedStatusSource(): LoadPaymentStatus {
    return async (reference: string) => ({
        reference,
        status: 'CONFIRMED',
        checkedAtMs: CHECKED_AT_MS,
    });
}

describe('checkPaymentStatus', () => {
    describe('fulfilled Promise', () => {
        it('resolves with a validated payment status', async () => {
            const resultPromise = checkPaymentStatus(
                'payment-101',
                confirmedStatusSource(),
            );

            await expect(resultPromise).resolves.toEqual({
                reference: 'payment-101',
                status: 'CONFIRMED',
                checkedAtMs: CHECKED_AT_MS,
            });
        });

        it('trims the reference before loading and returning the status', async () => {
            const actual = await checkPaymentStatus(
                '  payment-101  ',
                confirmedStatusSource(),
            );

            expect(actual.reference).toBe('payment-101');
            expect(actual.status).toBe('CONFIRMED');
        });

        it('returns a Promise immediately', () => {
            const actual = checkPaymentStatus(
                'payment-101',
                confirmedStatusSource(),
            );

            expect(actual).toBeInstanceOf(Promise);

            return actual;
        });
    });

    describe('rejected Promise', () => {
        it('rejects an empty reference before requesting a status', async () => {
            const resultPromise = checkPaymentStatus(
                '   ',
                confirmedStatusSource(),
            );

            await expect(resultPromise).rejects.toMatchObject({
                name: 'PaymentStatusCheckError',
                code: 'INVALID_REFERENCE',
                message: 'payment reference must be a non-empty string',
            });
        });

        it('rejects a response that violates the expected contract', async () => {
            const invalidStatusSource: LoadPaymentStatus = async (reference) => ({
                reference,
                status: 'UNKNOWN',
                checkedAtMs: CHECKED_AT_MS,
            });

            await expect(
                checkPaymentStatus('payment-101', invalidStatusSource),
            ).rejects.toThrowError(
                'payment status source returned an invalid response',
            );
        });

        it('wraps a source failure and preserves its cause', async () => {
            const sourceError = new Error('connection timed out');
            const failingStatusSource: LoadPaymentStatus = async () => {
                throw sourceError;
            };

            await expect(
                checkPaymentStatus('payment-101', failingStatusSource),
            ).rejects.toMatchObject({
                name: 'PaymentStatusCheckError',
                code: 'STATUS_SOURCE_UNAVAILABLE',
                cause: sourceError,
            });
        });

        it('allows structured inspection of an awaited rejection', async () => {
            expect.assertions(3);

            try {
                await checkPaymentStatus('payment-101', async () => null);
            } catch (error: unknown) {
                expect(error).toBeInstanceOf(PaymentStatusCheckError);

                if (!(error instanceof PaymentStatusCheckError)) {
                    throw error;
                }

                expect(error.code).toBe('INVALID_RESPONSE');
                expect(error.message).toBe(
                    'payment status source returned an invalid response',
                );
            }
        });
    });
});

/*
 * ASYNC ASSERTION RULES
 *
 * Fulfilled Promise:
 *     await expect(operation()).resolves.toEqual(expected)
 *
 * Rejected Promise:
 *     await expect(operation()).rejects.toThrowError(expectedMessage)
 *
 * The await is essential. Without it, the test may finish before Vitest checks
 * the Promise, which can create a false-positive test or an unhandled rejection.
 */

/*
 * RETURNING A PROMISE
 *
 * An async test can await its Promise. A non-async test can return the Promise
 * to Vitest, as demonstrated by "returns a Promise immediately". Both forms
 * tell the runner when the asynchronous work has finished.
 */

/*
 * ERROR OBSERVATION
 *
 * Remove await from the rejects assertion in the invalid-response test and
 * temporarily make the source return a valid status. The test body can finish
 * without waiting for the failed expectation. Restore await immediately after
 * observing why the test runner must own the Promise lifecycle.
 */

/*
 * APPLICATION TASK
 *
 * Add a test proving that a response with a different payment reference is
 * rejected with INVALID_RESPONSE. The production rule already supports this;
 * the task is to express the missing behaviour as readable test evidence.
 */

/*
 * INTERVIEW SENTENCES
 *
 * "I await async expectations so the test runner observes their completion."
 * "I use resolves for fulfilled Promises and rejects for rejected Promises."
 * "I validate data returned by an async dependency before trusting it."
 */

/*
 * FINAL SUMMARY
 *
 * This suite demonstrates:
 * - direct await and Promise-returning tests
 * - resolves and rejects assertions
 * - successful, invalid-response, and unavailable-source paths
 * - custom async error codes and preserved error causes
 * - structured rejection inspection with unknown and instanceof
 * - protection against false-positive asynchronous tests
 *
 * vi.fn, spies, and module mocks are intentionally deferred. The next
 * increment explains when each test-double technique is appropriate.
 */
