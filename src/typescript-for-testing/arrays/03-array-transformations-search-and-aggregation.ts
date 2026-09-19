/*
 * ARRAY TRANSFORMATIONS, SEARCH AND AGGREGATION
 *
 * Array methods express common collection operations through callbacks.
 * Understanding what each method returns is more important than memorising
 * syntax.
 *
 * This lesson covers:
 * - map for one output per input
 * - filter for a selected subset
 * - find for the first match
 * - some and every for boolean questions
 * - reduce for one accumulated result
 * - chaining transformations in readable steps
 */

type TestResult = {
    name: string;
    durationMs: number;
    passed: boolean;
};

const testResults: TestResult[] = [
    {
        name: 'login succeeds',
        durationMs: 420,
        passed: true,
    },
    {
        name: 'order is created',
        durationMs: 780,
        passed: true,
    },
    {
        name: 'forbidden access is rejected',
        durationMs: 1150,
        passed: false,
    },
];

/*
 * SECTION 1
 * map transforms every element
 *
 * map calls its callback once per element and creates a new array containing
 * one returned value for each input element.
 */

const testNames = testResults.map((result) => {
    return result.name;
});

console.log('Test names:', testNames);

const resultLabels = testResults.map((result) => {
    const outcome = result.passed ? 'PASS' : 'FAIL';

    return `${result.name}: ${outcome}`;
});

console.log('Result labels:', resultLabels);

/*
 * testResults remains an array of TestResult objects.
 * testNames is string[].
 * resultLabels is string[].
 */

/*
 * SECTION 2
 * filter keeps matching elements
 *
 * The callback returns a boolean. true keeps the original element; false
 * excludes it from the new array.
 */

const failedResults = testResults.filter((result) => {
    return !result.passed;
});

const slowResults = testResults.filter((result) => {
    return result.durationMs > 1000;
});

console.log('Failed results:', failedResults);
console.log('Slow results:', slowResults);

/*
 * filter does not convert TestResult objects into booleans. The boolean only
 * decides whether each complete object appears in the returned array.
 */

/*
 * SECTION 3
 * find returns the first match or undefined
 */

const failedResult = testResults.find((result) => {
    return !result.passed;
});

if (failedResult === undefined) {
    console.log('No failed result found');
} else {
    console.log('First failed result:', failedResult.name);
}

const missingResult = testResults.find((result) => {
    return result.name === 'non-existent test';
});

console.log('Missing result:', missingResult);

/*
 * find returns TestResult | undefined. It returns one element, not an array.
 * filter always returns an array, which may be empty.
 */

/*
 * SECTION 4
 * some asks whether at least one element matches
 */

const hasFailure = testResults.some((result) => {
    return !result.passed;
});

const hasVerySlowResult = testResults.some((result) => {
    return result.durationMs > 2000;
});

console.log('Has failure:', hasFailure);
console.log('Has very slow result:', hasVerySlowResult);

/*
 * SECTION 5
 * every asks whether all elements match
 */

const allPassed = testResults.every((result) => {
    return result.passed;
});

const allWithinTwoSeconds = testResults.every((result) => {
    return result.durationMs <= 2000;
});

console.log('All passed:', allPassed);
console.log('All within two seconds:', allWithinTwoSeconds);

/*
 * some and every return booleans. They stop as soon as the final answer is
 * known, so they communicate the question more clearly than a manual counter.
 */

/*
 * SECTION 6
 * reduce combines all elements into one result
 *
 * The accumulator starts with the initial value 0. Each callback call returns
 * the accumulator for the next call.
 */

const totalDurationMs = testResults.reduce(
    (total, result) => {
        return total + result.durationMs;
    },
    0,
);

console.log('Total duration:', totalDurationMs);

const averageDurationMs = testResults.length === 0
    ? undefined
    : totalDurationMs / testResults.length;

console.log('Average duration:', averageDurationMs);

/*
 * Providing an initial accumulator avoids special behaviour for an empty
 * array. The average still handles an empty collection explicitly to avoid
 * division by zero.
 */

/*
 * SECTION 7
 * Counting with reduce
 */

const passedCount = testResults.reduce(
    (count, result) => {
        if (result.passed) {
            return count + 1;
        }

        return count;
    },
    0,
);

console.log('Passed count:', passedCount);

/*
 * SECTION 8
 * Readable transformation pipeline
 *
 * Filter first, then map the selected objects into strings.
 */

const failedResultNames = testResults
    .filter((result) => {
        return !result.passed;
    })
    .map((result) => {
        return result.name;
    });

console.log('Failed result names:', failedResultNames);

/*
 * Chaining is helpful when each step remains easy to identify. Use named
 * intermediate variables when a long chain hides the data flow.
 */

/*
 * PRACTICE
 */

const durations = [250, 500, 1250, 750];

const acceptableDurations = durations.filter((durationMs) => {
    return durationMs <= 1000;
});

const durationLabels = acceptableDurations.map((durationMs) => {
    return `${durationMs} ms`;
});

const maximumDuration = durations.reduce(
    (currentMaximum, durationMs) => {
        return durationMs > currentMaximum
            ? durationMs
            : currentMaximum;
    },
    0,
);

console.log('Acceptable duration labels:', durationLabels);
console.log('Maximum duration:', maximumDuration);

/*
 * FINAL SUMMARY
 *
 * map:
 * Returns one transformed output for every input element.
 *
 * filter:
 * Returns an array containing the input elements that matched.
 *
 * find:
 * Returns the first matching element or undefined.
 *
 * some:
 * Returns true when at least one element matches.
 *
 * every:
 * Returns true when every element matches.
 *
 * reduce:
 * Combines all elements into one accumulated result.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: How do map and filter differ?
 * A: map returns one transformed value for every input. filter keeps a subset
 *    of the original elements based on a boolean callback.
 *
 * Q: How do find and filter differ?
 * A: find returns the first match or undefined. filter returns an array of all
 *    matches, which may be empty.
 *
 * Q: When would you use some or every?
 * A: Use some for "does at least one match?" and every for "do all match?".
 *
 * Q: Why give reduce an initial value?
 * A: It defines the accumulator type and behaviour clearly, including for an
 *    empty array.
 */
