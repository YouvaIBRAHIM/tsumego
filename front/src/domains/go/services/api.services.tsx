import { IProblem, IProblemCreate, IProblemList, ITsumegoProblemSearch } from "../types/go.types";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const getProblems = async (page: number, perPage: number, search: ITsumegoProblemSearch): Promise<IProblemList> => {
    try {        
        const response = await fetch(`${BACKEND_BASE_URL}/api/problems?page=${page}&perPage=${perPage}&level=${search.level}&searchBy=${search.searchBy}&searchValue=${search.value}&status=${search.status}`);
        const data = await response.json()
        return {
            total: data.count,
            data: data.results
        };
    } catch {
        throw new Error("Une erreur est survenue lors du chargement des problèmes. Veuillez réessayer.");
    }
}

export async function deleteProblem(id: string) {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/problems/${id}/`, {
            method: "DELETE",
            headers: new Headers({'content-type': 'application/json'}),            
        })
        return response;
    } catch {
        throw new Error("Une erreur est survenue lors de la suppression du problème. Veuillez réessayer.");
    }
};


interface IErrorCreateProblem {
  label: [string];
}
type IProblemCreateResponse = Promise<[Response["status"], IProblemCreate | IErrorCreateProblem]>;

export const createProblem = async (data: IProblemCreate): IProblemCreateResponse => {
    const res = await fetch(`${BACKEND_BASE_URL}/api/problems/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    return [res.status, result];
};

export async function getProblem(id: string): Promise<IProblem> {
    const response = await fetch(`${BACKEND_BASE_URL}/api/problems/${id}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    try {
        return await response.json();
    } catch (error) {
        return Promise.reject("Une erreur est survenue lors du chargement du problème. Veuillez réessayer.");
    }
}


export async function updateProblemStatus(id: string) {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/problems/update/status/${id}/`, {
            method: "PUT",
        })
        return await response.json();
    } catch {
        throw new Error("Une erreur est survenue lors de la suppression du problème. Veuillez réessayer.");
    }
}