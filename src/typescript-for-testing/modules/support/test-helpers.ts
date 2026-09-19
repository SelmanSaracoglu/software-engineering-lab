import type {
    StatusResult,
} from './test-contracts.js';

export const DEFAULT_TIMEOUT_MS = 1000;

export function createStatusResult(
    actualStatus: number,
    expectedStatus: number,
): StatusResult {
    return {
        actualStatus,
        expectedStatus,
        passed: actualStatus === expectedStatus,
    };
}
