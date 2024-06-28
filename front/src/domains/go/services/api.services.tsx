import { IProblem, IProblemCreate, IProblemList, ITsumegoProblemSearch } from "../types/go.types";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getProblems = async (page: number, perPage: number, search: ITsumegoProblemSearch): Promise<IProblemList> => {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/problems?page=${page}&perPage=${perPage}&level=${search.level}&searchBy=${search.searchBy}&searchValue=${search.value}&status=${search.status}`,
            {
                credentials: 'include'
            }
        );
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
        const csrfToken = await getCsrfToken();

        const response = await fetch(`${BACKEND_BASE_URL}/api/problems/${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken || '',
            },  
            credentials: 'include'
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
  const csrfToken = await getCsrfToken();

  const res = await fetch(`${BACKEND_BASE_URL}/api/problems/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
    },
    body: JSON.stringify(data),
    credentials: "include",
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
        const csrfToken = await getCsrfToken();

        const response = await fetch(`${BACKEND_BASE_URL}/api/problems/update/status/${id}/`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken || '',
            },
        })
        
        return await response.json();
    } catch {
        throw new Error("Une erreur est survenue lors de la mise à jour du status du problème. Veuillez réessayer.");
    }
}

export async function getCsrfToken(): Promise<string | null> {
    try {
        const csrfResponse = await fetch(`${BACKEND_BASE_URL}/api/csrf-token/`, { credentials: 'include' });
        const csrfData = await csrfResponse.json();
        return csrfData.csrfToken;
    } catch (error) {
        return null
    }
}
