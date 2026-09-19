/*
 * STRING, NUMBER, DATE AND REGEXP OPERATIONS
 *
 * Tests receive runtime values that must be normalised, parsed, compared, and
 * searched. This lesson collects the most transferable operations without
 * attempting to reproduce the complete standard library.
 *
 * This lesson covers:
 * - common non-mutating string operations
 * - explicit string-to-number conversion
 * - validating numeric results
 * - parsing and comparing dates
 * - testing text with regular expressions
 */

/*
 * SECTION 1
 * String normalisation
 */

const rawUsername = '  Security.Analyst  ';

const normalizedUsername =
    rawUsername.trim().toLowerCase();

console.log('Normalized username:', normalizedUsername);

/*
 * trim removes whitespace at the beginning and end.
 * toLowerCase returns a new lowercase string.
 * Strings are immutable; rawUsername itself does not change.
 */

console.log('Original username:', rawUsername);

/*
 * SECTION 2
 * Searching and checking strings
 */

const auditMessage =
    'LOGIN_FAILED requestId=request-101 user=analyst';

console.log(
    'Contains event name:',
    auditMessage.includes('LOGIN_FAILED'),
);

console.log(
    'Starts with event name:',
    auditMessage.startsWith('LOGIN_FAILED'),
);

console.log(
    'Ends with username:',
    auditMessage.endsWith('user=analyst'),
);

const messageParts = auditMessage.split(' ');

console.log('Message parts:', messageParts);

/*
 * includes, startsWith, and endsWith are case-sensitive. Normalise first only
 * when the requirement says the comparison should ignore case.
 */

/*
 * SECTION 3
 * Replacing text
 */

const unsafeLog = 'token=secret-value status=200';

const redactedLog = unsafeLog.replace(
    'secret-value',
    '[REDACTED]',
);

console.log('Redacted log:', redactedLog);

/*
 * replace returns a new string. A real redaction policy must cover every
 * sensitive format; one literal replacement is only a learning example.
 */

/*
 * SECTION 4
 * Number conversion
 */

const statusText = '201';
const statusNumber = Number(statusText);

console.log('Converted status:', statusNumber);
console.log('Converted type:', typeof statusNumber);

const invalidNumber = Number('not-a-number');

console.log('Invalid conversion:', invalidNumber);
console.log(
    'Conversion is finite:',
    Number.isFinite(invalidNumber),
);

/*
 * Number performs runtime conversion. A TypeScript assertion such as
 * statusText as unknown as number would not convert the string.
 *
 * Failed numeric conversion produces NaN. Number.isFinite verifies that the
 * result is a finite number.
 */

function parseFiniteNumber(
    value: string,
): number | undefined {
    if (value.trim() === '') {
        return undefined;
    }

    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) {
        return undefined;
    }

    return parsedValue;
}

console.log('Parsed 750:', parseFiniteNumber('750'));
console.log('Parsed empty:', parseFiniteNumber(''));
console.log('Parsed invalid:', parseFiniteNumber('7ms'));

/*
 * Number('') produces 0, which is often surprising for input validation. The
 * helper rejects an empty trimmed string before conversion.
 */

/*
 * SECTION 5
 * Date parsing and comparison
 */

const startedAt = new Date('2026-09-19T10:00:00.000Z');
const finishedAt = new Date('2026-09-19T10:00:01.250Z');

const durationMs =
    finishedAt.getTime() - startedAt.getTime();

console.log('Started at ISO:', startedAt.toISOString());
console.log('Duration in milliseconds:', durationMs);

/*
 * getTime returns milliseconds since the Unix epoch. Comparing these numeric
 * values avoids locale-dependent formatted strings.
 */

function isValidDate(value: Date): boolean {
    return !Number.isNaN(value.getTime());
}

const invalidDate = new Date('not-a-date');

console.log('Date is valid:', isValidDate(startedAt));
console.log('Invalid date is valid:', isValidDate(invalidDate));

/*
 * Use explicit ISO 8601 input with a timezone when a test requires stable
 * cross-environment behaviour.
 */

/*
 * SECTION 6
 * Regular expressions
 *
 * A RegExp describes a text pattern. test returns a boolean.
 */

const requestIdPattern = /^request-[0-9]+$/;

console.log(
    'Valid request ID:',
    requestIdPattern.test('request-101'),
);

console.log(
    'Invalid request ID:',
    requestIdPattern.test('req-101'),
);

/*
 * ^ anchors the start, $ anchors the end, and [0-9]+ requires one or more
 * digits. Without anchors, a longer invalid string could contain a matching
 * substring and still pass.
 */

const logLine =
    'status=403 requestId=request-987 durationMs=450';

const statusMatch = /status=([0-9]{3})/.exec(logLine);

if (statusMatch !== null) {
    const capturedStatus = statusMatch[1];

    if (capturedStatus !== undefined) {
        console.log('Captured status:', capturedStatus);
    }
}

/*
 * exec returns RegExpExecArray | null. With checked index access, a capture
 * position is also treated as possibly undefined and is checked before use.
 */

/*
 * PRACTICE
 */

const rawDuration = ' 900 ';
const parsedDuration = parseFiniteNumber(rawDuration);

if (parsedDuration === undefined) {
    console.log('Duration is invalid');
} else {
    console.log(
        'Duration is acceptable:',
        parsedDuration <= 1000,
    );
}

const eventNamePattern = /^[A-Z]+(?:_[A-Z]+)*$/;

console.log(
    'Event name is valid:',
    eventNamePattern.test('PAYMENT_CONFIRMED'),
);

/*
 * FINAL SUMMARY
 *
 * String operations:
 * Return new values for normalisation, search, splitting, and replacement.
 *
 * Number conversion:
 * Happens at runtime with Number; validate the result with Number.isFinite
 * when non-finite values are invalid.
 *
 * Date comparison:
 * Uses numeric timestamps from getTime and explicit timezones for stability.
 *
 * Regular expression:
 * Describes a text pattern; test returns a boolean and exec may return captures
 * or null.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Does a TypeScript assertion convert a string to a number?
 * A: No. Use a runtime conversion such as Number and validate the result.
 *
 * Q: Why check Number.isFinite after conversion?
 * A: Invalid input can produce NaN, and infinite values may also be outside the
 *    accepted domain.
 *
 * Q: How can dates be compared reliably?
 * A: Parse explicit timestamp formats and compare numeric values from getTime.
 *
 * Q: Why anchor a validation regular expression?
 * A: ^ and $ require the complete input to match instead of accepting a valid
 *    substring inside a longer invalid value.
 */
