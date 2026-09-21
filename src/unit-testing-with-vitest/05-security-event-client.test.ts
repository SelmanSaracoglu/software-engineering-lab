/*
 * UNIT TESTING WITH VITEST
 * HTTP ADAPTER TEST
 *
 * The real network is outside this unit test. fetch is replaced at the global
 * boundary so the adapter's request and response handling remain observable.
 */

import { afterEach, describe, expect, it, vi } from 'vitest';

import { publishSecurityEvent } from './05-security-event-client.js';

const EVENT = {
    type: 'SESSION_EXPIRED' as const,
    sessionId: 'session-101',
    occurredAtMs: Date.parse('2026-09-21T12:05:00.000Z'),
};

afterEach(() => {
    vi.unstubAllGlobals();
});

describe('publishSecurityEvent', () => {
    it('posts the serialized event to the security endpoint', async () => {
        const fetchMock = vi
            .fn<typeof fetch>()
            .mockResolvedValue(new Response(null, { status: 202 }));
        vi.stubGlobal('fetch', fetchMock);

        await publishSecurityEvent(EVENT);

        expect(fetchMock).toHaveBeenCalledOnce();
        expect(fetchMock).toHaveBeenCalledWith('/api/security-events', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(EVENT),
        });
    });

    it('rejects when the endpoint returns an unsuccessful response', async () => {
        const fetchMock = vi
            .fn<typeof fetch>()
            .mockResolvedValue(new Response(null, { status: 503 }));
        vi.stubGlobal('fetch', fetchMock);

        await expect(publishSecurityEvent(EVENT)).rejects.toThrowError(
            'security event endpoint returned 503',
        );
    });
});
