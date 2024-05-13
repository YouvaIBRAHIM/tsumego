export interface IProblem {
    id: string;
    label: string;
    level: string;
    problem: {
        AB: string[];
        AW: string[];
        SZ: string;
        C: string;
        SOL: [string, string, string, string][];
    };
}