/*
 * UNIT TESTING WITH VITEST
 * FIFTH TEST SUITE: FAKE TIMERS AND MODULE MOCKING
 *
 * vi.useFakeTimers replaces clock-related APIs for this test file. vi.mock
 * replaces the imported security-event module, so these tests exercise session
 * timing without sending a real HTTP request.
 */

import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from 'vitest';

import { publishSecurityEvent } from './05-security-event-client.js';
import { waitForSessionExpiration } from './05-session-expiration-monitor.js';

vi.mock('./05-security-event-client.js', () => ({
    publishSecurityEvent: vi.fn(),
}));

const BASE_TIME_MS = Date.parse('2026-09-21T12:00:00.000Z');
const FIVE_MINUTES_MS = 5 * 60 * 1000;
const publishSecurityEventMock = vi.mocked(publishSecurityEvent);

beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(BASE_TIME_MS);
    publishSecurityEventMock.mockReset();
    publishSecurityEventMock.mockResolvedValue(undefined);
});

afterEach(() => {
    vi.useRealTimers();
});

describe('waitForSessionExpiration', () => {
    it('publishes the event only when the expiration boundary is reached', async () => {
        const completion = waitForSessionExpiration({
            id: 'session-101',
            expiresAtMs: BASE_TIME_MS + FIVE_MINUTES_MS,
        });

        await vi.advanceTimersByTimeAsync(FIVE_MINUTES_MS - 1);
        expect(publishSecurityEventMock).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(1);
        await expect(completion).resolves.toBeUndefined();

        expect(publishSecurityEventMock).toHaveBeenCalledOnce();
        expect(publishSecurityEventMock).toHaveBeenCalledWith({
            type: 'SESSION_EXPIRED',
            sessionId: 'session-101',
            occurredAtMs: BASE_TIME_MS + FIVE_MINUTES_MS,
        });
    });

    it('publishes immediately when the session is already expired', async () => {
        const completion = waitForSessionExpiration({
            id: 'session-expired',
            expiresAtMs: BASE_TIME_MS - 1,
        });

        await vi.runAllTimersAsync();
        await completion;

        expect(publishSecurityEventMock).toHaveBeenCalledWith({
            type: 'SESSION_EXPIRED',
            sessionId: 'session-expired',
            occurredAtMs: BASE_TIME_MS,
        });
    });

    it('rejects when the mocked event publisher rejects', async () => {
        const publishError = new Error('security endpoint unavailable');
        publishSecurityEventMock.mockRejectedValue(publishError);

        const completion = waitForSessionExpiration({
            id: 'session-101',
            expiresAtMs: BASE_TIME_MS + FIVE_MINUTES_MS,
        });
        const rejectionAssertion = expect(completion).rejects.toBe(
            publishError,
        );

        await vi.runAllTimersAsync();
        await rejectionAssertion;
    });
});

/*
 * TIMER CLEANUP RULE
 *
 * Fake timers change global test state. beforeEach creates the controlled clock,
 * and afterEach always restores real timers. Missing cleanup can make unrelated
 * tests hang or behave differently depending on execution order.
 */

/*
 * MODULE MOCKING RISK
 *
 * A module mock proves how this unit reacts to the adapter, but it does not run
 * the real adapter. That is why 05-security-event-client.test.ts separately
 * verifies request serialization and unsuccessful HTTP responses.
 *
 * Mocking internal business modules would hide too much behaviour. Prefer small
 * injectable boundaries; reserve module mocking for hard external seams.
 */

/*
 * ERROR OBSERVATION
 *
 * Remove vi.useRealTimers from afterEach and run this file with other suites.
 * Later tests can inherit the fake clock. Restore cleanup immediately after
 * observing why shared global state damages test isolation.
 */

/*
 * APPLICATION TASK
 *
 * Add a session that expires after one hour. Advance 59 minutes and prove that
 * no event is published, then advance the final minute and verify the event.
 */

/*
 * INTERVIEW SENTENCES
 *
 * "Fake timers make time deterministic and remove real waiting from unit tests."
 * "I restore global timer state after every test to preserve isolation."
 * "A module mock does not test the mocked module, so I verify that boundary separately."
 */

/*
 * FINAL SUMMARY
 *
 * This suite demonstrates:
 * - vi.useFakeTimers and vi.setSystemTime
 * - advanceTimersByTimeAsync and runAllTimersAsync
 * - timer-boundary assertions without real delays
 * - hoisted vi.mock and typed vi.mocked access
 * - resolved and rejected module behaviour
 * - cleanup of global timer state
 * - separate verification of the mocked HTTP adapter
 */
