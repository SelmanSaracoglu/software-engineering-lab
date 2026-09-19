/*
 * UTILITY TYPES AND DERIVED RETURN TYPES
 *
 * TypeScript includes utility types that derive a new type from an existing
 * contract. Derivation reduces duplicated shapes, but the new type must still
 * represent a real use case.
 *
 * This lesson covers:
 * - Partial and Required
 * - Pick and Omit
 * - Readonly
 * - ReturnType
 * - Parameters
 * - deriving types without duplicating source contracts
 */

type User = {
    id: string;
    username: string;
    displayName?: string;
    active: boolean;
};

/*
 * SECTION 1
 * Partial
 *
 * Partial<T> makes every property optional.
 */

type UserUpdate = Partial<User>;

const deactivateUserUpdate: UserUpdate = {
    active: false,
};

console.log('User update:', deactivateUserUpdate);

/*
 * Partial is useful for patch-like input where each field may be omitted. It
 * should not replace User when a complete user is required.
 *
 * With exactOptionalPropertyTypes, optional properties are omitted rather than
 * automatically assigned undefined.
 */

/*
 * SECTION 2
 * Required
 *
 * Required<T> makes every property required.
 */

type CompleteUser = Required<User>;

const completeUser: CompleteUser = {
    id: 'user-101',
    username: 'analyst',
    displayName: 'Security Analyst',
    active: true,
};

console.log('Complete user:', completeUser);

/*
 * SECTION 3
 * Pick
 *
 * Pick<T, Keys> creates a type containing selected properties.
 */

type UserIdentity = Pick<
    User,
    'id' | 'username'
>;

const userIdentity: UserIdentity = {
    id: 'user-101',
    username: 'analyst',
};

console.log('User identity:', userIdentity);

/*
 * SECTION 4
 * Omit
 *
 * Omit<T, Keys> keeps every property except the selected keys.
 */

type UserWithoutId = Omit<User, 'id'>;

const newUserInput: UserWithoutId = {
    username: 'new.operator',
    active: true,
};

console.log('New user input:', newUserInput);

/*
 * Pick and Omit derive related views. Avoid publishing sensitive data simply
 * because a broad source type already contains it; define the intended output
 * contract deliberately.
 */

/*
 * SECTION 5
 * Readonly
 *
 * Readonly<T> makes every top-level property readonly.
 */

type StoredUser = Readonly<User>;

const storedUser: StoredUser = {
    id: 'user-202',
    username: 'payment.operator',
    active: true,
};

console.log('Stored user:', storedUser);

// storedUser.active = false;

/*
 * Readonly is shallow and compile-time only.
 */

/*
 * SECTION 6
 * ReturnType
 *
 * ReturnType<typeof fn> derives the function's returned type.
 */

function createStatusResult(
    actualStatus: number,
    expectedStatus: number,
) {
    return {
        actualStatus,
        expectedStatus,
        passed: actualStatus === expectedStatus,
    };
}

type StatusResult = ReturnType<
    typeof createStatusResult
>;

const storedStatusResult: StatusResult = {
    actualStatus: 200,
    expectedStatus: 200,
    passed: true,
};

console.log('Stored status result:', storedStatusResult);

/*
 * typeof createStatusResult obtains the function type. ReturnType extracts its
 * returned object type. There is one source of truth for the result shape.
 */

/*
 * SECTION 7
 * Parameters
 *
 * Parameters<typeof fn> derives a tuple containing the parameter types.
 */

type StatusResultArguments = Parameters<
    typeof createStatusResult
>;

const statusArguments: StatusResultArguments = [
    201,
    201,
];

const resultFromDerivedArguments =
    createStatusResult(...statusArguments);

console.log(
    'Result from derived arguments:',
    resultFromDerivedArguments,
);

/*
 * SECTION 8
 * Utility types can be composed
 */

type EditableUserFields = Partial<
    Pick<User, 'displayName' | 'active'>
>;

const profilePatch: EditableUserFields = {
    displayName: 'Updated Name',
};

console.log('Profile patch:', profilePatch);

/*
 * Composition is helpful while the meaning remains clear. If a derived type
 * becomes difficult to read or represents an important public contract, a
 * descriptive named shape may be clearer.
 */

/*
 * PRACTICE
 */

type ApiTestCase = {
    id: string;
    name: string;
    endpoint: string;
    expectedStatus: number;
};

type NewApiTestCase = Omit<ApiTestCase, 'id'>;
type ApiTestCasePatch = Partial<
    Pick<ApiTestCase, 'name' | 'expectedStatus'>
>;

const newApiTestCase: NewApiTestCase = {
    name: 'profile request succeeds',
    endpoint: '/api/profile',
    expectedStatus: 200,
};

const apiTestCasePatch: ApiTestCasePatch = {
    expectedStatus: 204,
};

console.log(newApiTestCase, apiTestCasePatch);

/*
 * FINAL SUMMARY
 *
 * Partial<T>:
 * Makes every property optional.
 *
 * Required<T>:
 * Makes every property required.
 *
 * Pick<T, K>:
 * Keeps selected properties.
 *
 * Omit<T, K>:
 * Removes selected properties.
 *
 * Readonly<T>:
 * Makes top-level properties readonly.
 *
 * ReturnType and Parameters:
 * Derive output and input types from a function type.
 */

/*
 * INTERVIEW ANSWERS
 *
 * Q: Why use utility types?
 * A: They derive related contracts from an existing source type and reduce
 *    duplicated property definitions.
 *
 * Q: How do Pick and Omit differ?
 * A: Pick keeps the named properties; Omit keeps everything except them.
 *
 * Q: What does ReturnType<typeof fn> do?
 * A: It extracts the type returned by fn without calling the function.
 *
 * Q: When can utility-type composition become harmful?
 * A: When the resulting contract is difficult to understand or hides an
 *    important domain concept that deserves its own descriptive type.
 */
