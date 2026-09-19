/*
 * DISCRIMINATED UNIONS, INTERSECTIONS AND EXHAUSTIVE CHECKS
 *
 * Related states often carry different data. A discriminated union gives every
 * state a shared literal property so TypeScript can connect the state with the
 * fields available in that state.
 *
 * This lesson covers:
 * - discriminated unions
 * - state-specific properties
 * - switch narrowing
 * - exhaustive never checks
 * - intersection types
 * - testing-oriented result modelling
 */

/*
 * SECTION 1
 * Discriminated union
 */

type ApiSuccess = {
    kind: 'success';
    statusCode: number;
    data: string;
};

type ApiFailure = {
    kind: 'failure';
    statusCode: number;
    errorMessage: string;
};

type ApiResult = ApiSuccess | ApiFailure;

function describeApiResult(result: ApiResult): string {
    if (result.kind === 'success') {
        return `SUCCESS ${result.statusCode}: ${result.data}`;
    }

    return `FAILURE ${result.statusCode}: ${result.errorMessage}`;
}

const successfulResult: ApiResult = {
    kind: 'success',
    statusCode: 200,
    data: 'order-101',
};

const failedResult: ApiResult = {
    kind: 'failure',
    statusCode: 403,
    errorMessage: 'Forbidden',
};

console.log(describeApiResult(successfulResult));
console.log(describeApiResult(failedResult));

/*
 * kind is the discriminant. When kind is 'success', data is available. When
 * kind is 'failure', errorMessage is available. Invalid combinations are not
 * representable by the union.
 */

/*
 * SECTION 2
 * Modelling several execution states
 */

type TestExecutionState =
    | {
        state: 'pending';
      }
    | {
        state: 'running';
        startedAt: string;
      }
    | {
        state: 'passed';
        durationMs: number;
      }
    | {
        state: 'failed';
        durationMs: number;
        reason: string;
      };

function createExecutionSummary(
    execution: TestExecutionState,
): string {
    switch (execution.state) {
        case 'pending':
            return 'Test is pending';
        case 'running':
            return `Started at ${execution.startedAt}`;
        case 'passed':
            return `Passed in ${execution.durationMs} ms`;
        case 'failed':
            return `Failed in ${execution.durationMs} ms: ${execution.reason}`;
        default:
            return assertNever(execution);
    }
}

function assertNever(value: never): never {
    throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
}

console.log(
    createExecutionSummary({
        state: 'passed',
        durationMs: 520,
    }),
);

/*
 * SECTION 3
 * Exhaustive check
 *
 * After every declared state has been handled, execution has type never in the
 * default branch. If a new union member is added but no case is added, passing
 * it to assertNever produces a compile-time error.
 *
 * The thrown error is still useful at runtime if untyped external data reaches
 * this code unexpectedly. Compile-time exhaustiveness does not validate JSON.
 */

/*
 * SECTION 4
 * Intersection types
 *
 * An intersection A & B requires one value to satisfy both types.
 */

type RequestContext = {
    requestId: string;
    endpoint: string;
};

type ActorContext = {
    username: string;
    role: string;
};

type AuditedRequest = RequestContext & ActorContext;

const auditedRequest: AuditedRequest = {
    requestId: 'request-101',
    endpoint: '/api/audit',
    username: 'admin',
    role: 'ADMIN',
};

console.log('Audited request:', auditedRequest);

/*
 * A union means one member or another. An intersection means all requirements
 * from both types at the same time.
 */

/*
 * SECTION 5
 * Intersection conflicts
 *
 * Intersections are not a general object-merging command. Incompatible
 * properties can create an impossible type.
 */

type NumericId = {
    id: number;
};

type StringId = {
    id: string;
};

type ImpossibleId = NumericId & StringId;

/*
 * ImpossibleId.id would have to be both number and string, which becomes never.
 * No ordinary value can satisfy that requirement. The alias is legal, but a
 * useful object cannot be created from it.
 */

type ImpossibleIdValue = ImpossibleId['id'];

function explainImpossibleId(
    _value: ImpossibleIdValue,
): void {
    console.log('This function cannot receive a normal value');
}

/*
 * explainImpossibleId is intentionally never called because its parameter is
 * never. Prefer explicit compatible shapes over clever intersections.
 */

/*
 * PRACTICE
 */

type AuthorizationResult =
    | {
        decision: 'allowed';
        grantedRole: string;
      }
    | {
        decision: 'denied';
        requiredRole: string;
        actualRole: string;
      };

function describeAuthorization(
    result: AuthorizationResult,
): string {
    switch (result.decision) {
        case 'allowed':
            return `Allowed as ${result.grantedRole}`;
        case 'denied':
            return `Required ${result.requiredRole}, received ${result.actualRole}`;
        default:
            return assertNever(result);
    }
}

console.log(
    describeAuthorization({
        decision: 'denied',
        requiredRole: 'ADMIN',
        actualRole: 'ORDER_OPERATOR',
    }),
);

/*
 * FINAL SUMMARY
 *
 * Discriminated union:
 * A union whose members share a literal property that identifies each state.
 *
 * Exhaustive check:
 * Uses never to make an unhandled union member a compiler error.
 *
 * Intersection:
 * Requires one value to satisfy multiple types simultaneously.
 *
 * State modelling:
 * Places fields only on the states in which they are valid.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: What makes a union discriminated?
 * A: Every member has a shared property with a different literal value, such
 *    as kind: 'success' or kind: 'failure'.
 *
 * Q: What is the purpose of an exhaustive never check?
 * A: It makes the compiler report a missing branch when a union gains a new
 *    member that the switch does not handle.
 *
 * Q: How do a union and an intersection differ?
 * A: A union accepts one of several member types. An intersection requires all
 *    combined type requirements at once.
 */
