/*
 * UNIT TESTING WITH VITEST
 * SECOND TEST SUITE: VALIDATION AND EXCEPTIONS
 *
 * A validation test should prove both sides of the contract:
 * - valid input returns a trustworthy value,
 * - invalid input fails with useful diagnostic information.
 */

import { describe, expect, it } from 'vitest';

import {
    OrderValidationError,
    parseOrderInput,
} from './02-order-input-validation.js';

function validOrderInput() {
    return {
        customerName: '  Ada Lovelace  ',
        items: [
            {
                productId: 'dress-101',
                quantity: 2,
                unitPriceCents: 4_500,
            },
            {
                productId: 'scarf-202',
                quantity: 1,
                unitPriceCents: 1_500,
            },
        ],
    };
}

describe('parseOrderInput', () => {
    describe('valid input', () => {
        it('normalizes the input and calculates the order total', () => {
            const input = validOrderInput();

            const actual = parseOrderInput(input);

            expect(actual).toEqual({
                customerName: 'Ada Lovelace',
                items: input.items,
                totalCents: 10_500,
            });
        });

        it('accepts the minimum valid quantity boundary', () => {
            const input = validOrderInput();
            input.items[0]!.quantity = 1;

            expect(() => parseOrderInput(input)).not.toThrow();
        });

        it('accepts zero as the minimum non-negative price', () => {
            const input = validOrderInput();
            input.items[0]!.unitPriceCents = 0;

            const actual = parseOrderInput(input);

            expect(actual.totalCents).toBe(1_500);
        });
    });

    describe('exception contract', () => {
        it('throws the custom error type for a non-object input', () => {
            const act = () => parseOrderInput(null);

            expect(act).toThrow(OrderValidationError);
            expect(act).toThrowError('Order validation failed');
        });

        it('reports an empty order item list as a validation issue', () => {
            const act = () =>
                parseOrderInput({
                    customerName: 'Ada Lovelace',
                    items: [],
                });

            expect(act).toThrowError(OrderValidationError);
            expect(act).toThrowError('Order validation failed');
        });

        it('exposes all structured issues for diagnostics', () => {
            expect.assertions(5);

            try {
                parseOrderInput({
                    customerName: '   ',
                    items: [
                        {
                            productId: '',
                            quantity: 0,
                            unitPriceCents: -1,
                        },
                    ],
                });
            } catch (error: unknown) {
                expect(error).toBeInstanceOf(OrderValidationError);

                if (!(error instanceof OrderValidationError)) {
                    throw error;
                }

                expect(error.name).toBe('OrderValidationError');
                expect(error.issues).toHaveLength(4);
                expect(error.issues).toContainEqual({
                    path: 'customerName',
                    code: 'REQUIRED',
                    message: 'customerName must be a non-empty string',
                });
                expect(error.issues).toContainEqual({
                    path: 'items[0].quantity',
                    code: 'INVALID_VALUE',
                    message: 'items[0].quantity must be a positive integer',
                });
            }
        });
    });

    describe('invalid value boundaries', () => {
        it.each([
            { name: 'zero', quantity: 0 },
            { name: 'negative', quantity: -1 },
            { name: 'fractional', quantity: 1.5 },
        ])('rejects a $name quantity', ({ quantity }) => {
            const input = validOrderInput();
            input.items[0]!.quantity = quantity;

            expect(() => parseOrderInput(input)).toThrow(
                OrderValidationError,
            );
        });
    });
});

/*
 * EXCEPTION ASSERTION RULE
 *
 * Pass a function to expect:
 *     expect(() => parseOrderInput(input)).toThrow()
 *
 * Do not call the throwing function before expect:
 *     expect(parseOrderInput(input)).toThrow()
 *
 * In the second form, the exception escapes before Vitest can observe it.
 */

/*
 * WHY USE expect.assertions WITH try/catch?
 *
 * toThrow is best when only the error type or message matters. A try/catch is
 * useful when structured fields must be inspected. expect.assertions(5) makes
 * the test fail if the function unexpectedly returns and the catch block never
 * runs.
 */

/*
 * ERROR OBSERVATION
 *
 * Change the quantity rule in production from < 1 to < 0. The test named
 * "rejects a zero quantity" fails because zero crosses the business boundary.
 * Restore the original rule after observing the failure.
 */

/*
 * APPLICATION TASK
 *
 * Add a rule that rejects duplicate productId values. First write a failing
 * test that checks the issue path and code, then implement the smallest rule
 * that makes it pass. Keep the existing tests green.
 */

/*
 * INTERVIEW SENTENCES
 *
 * "I test the successful result and the exception contract separately."
 * "For structured errors, I verify the error type and meaningful fields."
 * "TypeScript does not replace runtime validation for external input."
 */

/*
 * FINAL SUMMARY
 *
 * This suite demonstrates:
 * - runtime validation for unknown data
 * - custom error testing with toThrow and toThrowError
 * - structured error inspection with try/catch and instanceof narrowing
 * - expect.assertions protection against false-positive exception tests
 * - valid and invalid boundary checks
 * - toBeInstanceOf, toHaveLength, and toContainEqual matchers
 */
