import { IProblemAsideListData } from "../components/AsideList/ProblemsAsideList"
import { IPlateau } from "../components/Plateau/Plateau"
import { IGo, IProblem } from "../types/go.types"

export const problemListDataToAsideListData = (data: IProblem[] | null): IProblemAsideListData[] | null => {
    if(!data) return null

    return data.map(el => ({
        id: el.id,
        label: el.label,
        value: el.problem,
        meta: {
            won: el.won ?? false
        }
    }))
}

function charToNumber(char: string): number {
    return char.charCodeAt(0) - 96; 
}

export const transformProblemToGoState = (obj: IProblem | null) : IPlateau['defaultState'] | null => {
    if(obj === null) return null
        
    const { problem } = obj;
    const result: IGo['position'] = {};

    const { AB, AW, SZ, nextToPlay } = problem;

    if (AB && Array.isArray(AB)) {
        AB.forEach(position => {
            const [col, row] = position;
            result[`${col.toLocaleUpperCase()}${charToNumber(row)}`] = "black";
        });
    }

    if (AW && Array.isArray(AW)) {
        AW.forEach(position => {
            const [col, row] = position;
            result[`${col.toLocaleUpperCase()}${charToNumber(row)}`] = "white";
        });
    }
    return {
        position: result,
        size: Number(SZ),
        nextToPlay: nextToPlay
    };
}
