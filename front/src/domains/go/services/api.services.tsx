import { IProblem, IProblemList, ITsumegoProblemSearch } from "../types/go.types";

const BACKEND_BASE_URL = import.meta.env.BACKEND_BASE_URL

const problems: IProblem[] = [
    {
      id: "sdmffkds",
      label: "Problem0001",
      level: "beginner",
      won: false,
      AB: ["E1", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "B2", "C3", "D3"],
      SZ: "9",
      C: "Black to play: Elementary",
      SOL: [["B", "B3", "Correct.", ""]],
      nextToPlay: "black",
      active: true,
      author: "auteur1"
    },
    {
      id: "sdmflhds",
      label: "Problem0002",
      level: "beginner",
      won: true,
      AB: ["B1", "F2", "B2", "C3", "D3", "E6"],
      AW: ["D1", "B2", "B2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white",
      active: false,
      author: "auteur2"
    },
    {
      id: "ghjv",
      label: "Problem0003",
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
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
      level: "beginner",
      won: false,
      AB: ["B3", "F2", "B2", "C3", "D3", "B6"],
      AW: ["D1", "A1", "D2", "C3", "D3"],
      SZ: "19",
      C: "Black to play: Elementary",
      SOL: [["B", "ba", "Correct.", ""]],
      nextToPlay: "white"
    }
];

export const getProblems = async (page: number, perPage: number, search: ITsumegoProblemSearch) => {
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
