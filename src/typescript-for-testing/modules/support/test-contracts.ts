export type StatusResult = {
    actualStatus: number;
    expectedStatus: number;
    passed: boolean;
};

export type TestConfiguration = {
    endpoint: string;
    expectedStatus: number;
};
