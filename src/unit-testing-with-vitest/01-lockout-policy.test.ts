/*
 * UNIT TESTING WITH VITEST
 * FIRST TEST SUITE: ACCOUNT LOCKOUT POLICY
 *
 * Vitest discovers this file because its name contains .test.ts.
 *
 * describe groups related behaviour.
 * it and test both define one test; they are aliases.
 * expect receives an actual value and a matcher expresses the expectation.
 */

import { describe, expect, it, test } from 'vitest';

import {
    DEFAULT_LOCKOUT_POLICY,
    evaluatePasswordAttempt,
} from './01-lockout-policy.js';

import type {
    AccountState,
    AttemptOutcome,
} from './01-lockout-policy.js';

const BASE_TIME_MS = Date.parse('2026-09-20T10:00:00.000Z');

function activeState(failedAttempts: number): AccountState {
    return {
        status: 'ACTIVE',
        failedAttempts,
        lockedUntilMs: null,
    };
}

describe('evaluatePasswordAttempt', () => {
    describe('failed password threshold', () => {
        it('locks the account on the fifth consecutive failure', () => {
            // Arrange
            const currentState = activeState(4);
            const attempt = {
                passwordCorrect: false,
                occurredAtMs: BASE_TIME_MS,
            };

            // Act
            const actual = evaluatePasswordAttempt(
                currentState,
                attempt,
            );

            // Assert
            expect(actual.outcome).toBe('ACCOUNT_LOCKED');
            expect(actual.nextState).toEqual({
                status: 'LOCKED',
                failedAttempts: 5,
                lockedUntilMs:
                    BASE_TIME_MS +
                    DEFAULT_LOCKOUT_POLICY.lockDurationMs,
            });
        });

        const cases: ReadonlyArray<{
            name: string;
            failuresBeforeAttempt: number;
            expectedOutcome: AttemptOutcome;
            expectedStatus: AccountState['status'];
            expectedFailureCount: number;
        }> = [
            {
                name: 'first failure remains active',
                failuresBeforeAttempt: 0,
                expectedOutcome: 'PASSWORD_REJECTED',
                expectedStatus: 'ACTIVE',
                expectedFailureCount: 1,
            },
            {
                name: 'failure immediately below the threshold remains active',
                failuresBeforeAttempt: 3,
                expectedOutcome: 'PASSWORD_REJECTED',
                expectedStatus: 'ACTIVE',
                expectedFailureCount: 4,
            },
            {
                name: 'failure at the threshold locks the account',
                failuresBeforeAttempt: 4,
                expectedOutcome: 'ACCOUNT_LOCKED',
                expectedStatus: 'LOCKED',
                expectedFailureCount: 5,
            },
        ];

        it.each(cases)(
            '$name',
            ({
                failuresBeforeAttempt,
                expectedOutcome,
                expectedStatus,
                expectedFailureCount,
            }) => {
                const actual = evaluatePasswordAttempt(
                    activeState(failuresBeforeAttempt),
                    {
                        passwordCorrect: false,
                        occurredAtMs: BASE_TIME_MS,
                    },
                );

                expect(actual.outcome).toBe(expectedOutcome);
                expect(actual.nextState.status).toBe(expectedStatus);
                expect(actual.nextState.failedAttempts).toBe(
                    expectedFailureCount,
                );
            },
        );
    });

    describe('successful password', () => {
        test('resets failures before the lockout threshold', () => {
            const currentState = activeState(4);

            const actual = evaluatePasswordAttempt(currentState, {
                passwordCorrect: true,
                occurredAtMs: BASE_TIME_MS,
            });

            expect(actual).toEqual({
                outcome: 'AUTHENTICATED',
                nextState: {
                    status: 'ACTIVE',
                    failedAttempts: 0,
                    lockedUntilMs: null,
                },
            });
        });
    });

    describe('lock expiry boundary', () => {
        const lockedUntilMs =
            BASE_TIME_MS + DEFAULT_LOCKOUT_POLICY.lockDurationMs;

        const lockedState: AccountState = {
            status: 'LOCKED',
            failedAttempts: 5,
            lockedUntilMs,
        };

        it('rejects correct credentials one millisecond before expiry', () => {
            const actual = evaluatePasswordAttempt(lockedState, {
                passwordCorrect: true,
                occurredAtMs: lockedUntilMs - 1,
            });

            expect(actual.outcome).toBe('REJECTED_WHILE_LOCKED');
            expect(actual.nextState.status).toBe('LOCKED');
        });

        it('accepts correct credentials at the exact expiry instant', () => {
            const actual = evaluatePasswordAttempt(lockedState, {
                passwordCorrect: true,
                occurredAtMs: lockedUntilMs,
            });

            expect(actual.outcome).toBe('AUTHENTICATED');
            expect(actual.nextState.status).toBe('ACTIVE');
            expect(actual.nextState.failedAttempts).toBe(0);
        });

        it('starts a new failure sequence after the lock expires', () => {
            const actual = evaluatePasswordAttempt(lockedState, {
                passwordCorrect: false,
                occurredAtMs: lockedUntilMs,
            });

            expect(actual).toEqual({
                outcome: 'PASSWORD_REJECTED',
                nextState: {
                    status: 'ACTIVE',
                    failedAttempts: 1,
                    lockedUntilMs: null,
                },
            });
        });
    });

    describe('purity and isolation', () => {
        it('does not mutate the input state', () => {
            const currentState = activeState(2);
            const originalState = { ...currentState };

            const actual = evaluatePasswordAttempt(currentState, {
                passwordCorrect: false,
                occurredAtMs: BASE_TIME_MS,
            });

            expect(currentState).toEqual(originalState);
            expect(actual.nextState).not.toBe(currentState);
        });
    });
});

/*
 * MATCHERS USED
 *
 * toBe:
 * Strict equality for primitives and object identity.
 *
 * toEqual:
 * Deep structural equality for objects and arrays.
 *
 * not:
 * Inverts the following matcher. Here it proves a new state object was returned.
 */

/*
 * WHY TABLE-DRIVEN TESTING?
 *
 * The same action and assertions are executed for several meaningful inputs.
 * The table keeps the boundary differences visible without copying the complete
 * test body. It is useful when cases share behaviour, not when each case needs a
 * different setup or explanation.
 */

/*
 * ERROR OBSERVATION
 *
 * If the production rule changes from >= to > at the lockout threshold, the
 * named case "failure at the threshold locks the account" fails. Vitest reports
 * the exact test name plus the expected and received values. The failure points
 * to the boundary rule instead of only saying that a long user journey failed.
 */

/*
 * FINAL SUMMARY
 *
 * This suite demonstrates:
 * - explicit Vitest imports
 * - describe, it, and test
 * - Arrange-Act-Assert
 * - primitive and object matchers
 * - positive and negative behaviour
 * - boundary and state-transition cases
 * - table-driven testing with it.each
 * - deterministic time input
 * - pure input state
 *
 * It does not use mocks, spies, fake timers, or external dependencies. Those
 * tools solve different problems and belong to later increments.
 */

