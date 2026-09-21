/*
 * UNIT TESTING WITH VITEST
 * PRODUCTION CODE: TIME-DEPENDENT SESSION EXPIRATION
 *
 * This operation depends on the system clock, a timer, and an imported security
 * event adapter. Fake timers let unit tests control clock progress without
 * waiting in real time. Module mocking isolates the imported HTTP boundary.
 */

import { publishSecurityEvent } from './05-security-event-client.js';

export type Session = {
    readonly id: string;
    readonly expiresAtMs: number;
};

export async function waitForSessionExpiration(
    session: Session,
): Promise<void> {
    const delayMs = Math.max(0, session.expiresAtMs - Date.now());

    await new Promise<void>((resolve) => {
        setTimeout(resolve, delayMs);
    });

    await publishSecurityEvent({
        type: 'SESSION_EXPIRED',
        sessionId: session.id,
        occurredAtMs: Date.now(),
    });
}
