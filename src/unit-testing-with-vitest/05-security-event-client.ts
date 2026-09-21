/*
 * INFRASTRUCTURE BOUNDARY
 *
 * This small adapter sends a security event to an HTTP endpoint. Tests for code
 * that merely uses this adapter can replace the module. Tests for the adapter
 * itself should verify its own HTTP contract separately.
 */

export type SecurityEvent = {
    readonly type: 'SESSION_EXPIRED';
    readonly sessionId: string;
    readonly occurredAtMs: number;
};

export async function publishSecurityEvent(
    event: SecurityEvent,
): Promise<void> {
    const response = await fetch('/api/security-events', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(event),
    });

    if (!response.ok) {
        throw new Error(
            `security event endpoint returned ${response.status}`,
        );
    }
}
