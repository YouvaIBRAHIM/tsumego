export interface ITopPlayer{
    username: string;
    score: number;
}

export interface IUserProgression{
    won: number;
    total: number
}

export interface IMyTsumegoProblemsChart{
    problemsSuccessRate: [number[], number[], string[]]
}