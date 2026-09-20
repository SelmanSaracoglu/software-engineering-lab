/*
 * UNIT TESTING WITH VITEST
 * PRODUCTION CODE: ACCOUNT LOCKOUT POLICY
 *
 * This module contains a pure business rule. It receives all required state and
 * time as input and returns the result without using a database, HTTP request,
 * browser, global clock, or mutable shared store.
 *
 * That boundary makes the rule suitable for unit testing:
 * - input is explicit,
 * - output is observable,
 * - dependencies are absent,
 * - important states and boundaries can be reproduced quickly.
 */

export type ActiveAccountState = {
    readonly status: 'ACTIVE';
    readonly failedAttempts: number;
    readonly lockedUntilMs: null;
};

export type LockedAccountState = {
    readonly status: 'LOCKED';
    readonly failedAttempts: number;
    readonly lockedUntilMs: number;
};

export type AccountState = ActiveAccountState | LockedAccountState;

export type PasswordAttempt = {
    readonly passwordCorrect: boolean;
    readonly occurredAtMs: number;
};

export type LockoutPolicy = {
    readonly maximumFailedAttempts: number;
    readonly lockDurationMs: number;
};

export type AttemptOutcome =
    | 'AUTHENTICATED'
    | 'PASSWORD_REJECTED'
    | 'ACCOUNT_LOCKED'
    | 'REJECTED_WHILE_LOCKED';

export type AttemptResult = {
    readonly outcome: AttemptOutcome;
    readonly nextState: AccountState;
};

export const DEFAULT_LOCKOUT_POLICY: LockoutPolicy = {
    maximumFailedAttempts: 5,
    lockDurationMs: 15 * 60 * 1000,
};

function createActiveState(failedAttempts: number): ActiveAccountState {
    return {
        status: 'ACTIVE',
        failedAttempts,
        lockedUntilMs: null,
    };
}

export function evaluatePasswordAttempt(
    currentState: AccountState,
    attempt: PasswordAttempt,
    policy: LockoutPolicy = DEFAULT_LOCKOUT_POLICY,
): AttemptResult {
    if (
        currentState.status === 'LOCKED' &&
        attempt.occurredAtMs < currentState.lockedUntilMs
    ) {
        return {
            outcome: 'REJECTED_WHILE_LOCKED',
            nextState: currentState,
        };
    }

    const activeState =
        currentState.status === 'LOCKED'
            ? createActiveState(0)
            : currentState;

    if (attempt.passwordCorrect) {
        return {
            outcome: 'AUTHENTICATED',
            nextState: createActiveState(0),
        };
    }

    const nextFailureCount = activeState.failedAttempts + 1;

    if (nextFailureCount >= policy.maximumFailedAttempts) {
        return {
            outcome: 'ACCOUNT_LOCKED',
            nextState: {
                status: 'LOCKED',
                failedAttempts: nextFailureCount,
                lockedUntilMs:
                    attempt.occurredAtMs + policy.lockDurationMs,
            },
        };
    }

    return {
        outcome: 'PASSWORD_REJECTED',
        nextState: createActiveState(nextFailureCount),
    };
}

