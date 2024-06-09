import { IProblem, IProblemList, IProblemSearch } from "../types/go.types";

const BACKEND_BASE_URL = import.meta.env.BACKEND_BASE_URL

const problems: IProblem[] = [
    {
      id: "sdmffkds",
      label: "Problem0001",
      level: "easy",
      won: false,
      AB: ["E1", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "B2", "C3", "D3"],
      SZ: "9",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "black"
    },
    {
      id: "sdmflhds",
      label: "Problem0002",
      level: "easy",
      won: true,
      AB: ["B1", "F2", "B2", "C3", "D3", "E6"],
      AW: ["D1", "B2", "B2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white"
    },
    {
      id: "ghjv",
      label: "Problem0003",
      level: "easy",
      won: false,
      AB: ["C1", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "C3", "B2", "C3", "D3"],
      SZ: "12",
      C: "White to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white"
    },
    {
      id: "vcbjh",
      label: "Problem0004",
      level: "easy",
      won: false,
      AB: ["D1", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "D2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white"
    },
    {
      id: "asdfh",
      label: "Problem0005",
      level: "easy",
      won: false,
      AB: ["E1", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "B2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "black"
    },
    {
      id: "fdghtr",
      label: "Problem0006",
      level: "easy",
      won: true,
      AB: ["A3", "B2", "C3", "D3", "D6", "B6"],
      AW: ["D1", "C3", "D2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white"
    },
    {
      id: "dfgsda",
      label: "Problem0007",
      level: "easy",
      won: false,
      AB: ["A3", "F3", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "D2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "black"
    },
    {
      id: "dfgasd",
      label: "Problem0008",
      level: "easy",
      won: true,
      AB: ["A4", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "D2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white"
    },
    {
      id: "fdgasd",
      label: "Problem0009",
      level: "easy",
      won: false,
      AB: ["B1", "F3", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "D2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "black"
    },
    {
      id: "fdgas",
      label: "Problem0010",
      level: "easy",
      won: false,
      AB: ["B3", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "D2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white"
    }
];

export const getProblems = async (page: number, perPage: number, search: IProblemSearch) => {
    try {

        // const response = await fetch(`${BACKEND_BASE_URL}/api/problems?page=${page}&perPage=${perPage}&role=${search.role}&searchBy=${search.searchBy}&searchValue=${search.value}`);
        // return await response.json();

        console.log(page, perPage, search);
        
        return new Promise<IProblemList>((resolve) => {
            resolve({
                total: problems.length,
                data: problems
            });
        });
    } catch {
        return Promise.reject("Une erreur est survenue lors du chargement des problèmes. Veuillez réessayer.");
    }
}



export async function deleteProblem(id: string) {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/problems/${id}`, {
            method: "DELETE",
        })
        return await response.json();
    } catch {
        return Promise.reject("Une erreur est survenue lors de la suppression du problème. Veuillez réessayer.");
    }
}
