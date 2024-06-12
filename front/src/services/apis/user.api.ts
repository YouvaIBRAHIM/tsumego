import { IUser, IUserList, IUserSearch } from "@src/types/user.type";

const BACKEND_BASE_URL = import.meta.env.BACKEND_BASE_URL


const users: IUser[] = [
    { id: "1", firstname: "Alice", lastname: "Smith", email: "calice.smith@example.com", role: "admin" },
    { id: "2", firstname: "Bob", lastname: "Brown", email: "bob.brown@example.com", role: "editor" },
    { id: "3", firstname: "Charlie", lastname: "Davis", email: "charlie.davis@example.com", role: "player" },
    { id: "4", firstname: "David", lastname: "Miller", email: "david.miller@example.com", role: "all" },
    { id: "5", firstname: "Eve", lastname: "Wilson", email: "eve.wilson@example.com", role: "admin" },
    { id: "6", firstname: "Frank", lastname: "Moore", email: "frank.moore@example.com", role: "editor" },
    { id: "7", firstname: "Grace", lastname: "Taylor", email: "grace.taylor@example.com", role: "player" },
    { id: "8", firstname: "Hank", lastname: "Anderson", email: "hank.anderson@example.com", role: "all" },
    { id: "9", firstname: "Ivy", lastname: "Thomas", email: "ivy.thomas@example.com", role: "admin" },
    { id: "10", firstname: "Jack", lastname: "Jackson", email: "jack.jackson@example.com", role: "editor" },
    { id: "11", firstname: "Katie", lastname: "White", email: "katie.white@example.com", role: "player" },
    { id: "12", firstname: "Leo", lastname: "Harris", email: "leo.harris@example.com", role: "all" },
    { id: "13", firstname: "Mia", lastname: "Martin", email: "mia.martin@example.com", role: "admin" },
    { id: "14", firstname: "Nina", lastname: "Thompson", email: "nina.thompson@example.com", role: "editor" },
    { id: "15", firstname: "Oscar", lastname: "Garcia", email: "oscar.garcia@example.com", role: "player" },
    { id: "16", firstname: "Paul", lastname: "Martinez", email: "paul.martinez@example.com", role: "all" },
    { id: "17", firstname: "Quinn", lastname: "Robinson", email: "quinn.robinson@example.com", role: "admin" },
    { id: "18", firstname: "Rose", lastname: "Clark", email: "rose.clark@example.com", role: "editor" },
    { id: "19", firstname: "Sam", lastname: "Rodriguez", email: "sam.rodriguez@example.com", role: "player" },
    { id: "20", firstname: "Tina", lastname: "Lewis", email: "tina.lewis@example.com", role: "all" },
    { id: "21", firstname: "Uma", lastname: "Lee", email: "uma.lee@example.com", role: "admin" },
    { id: "22", firstname: "Victor", lastname: "Walker", email: "victor.walker@example.com", role: "editor" },
    { id: "23", firstname: "Wendy", lastname: "Hall", email: "wendy.hall@example.com", role: "player" },
    { id: "24", firstname: "Xander", lastname: "Allen", email: "xander.allen@example.com", role: "all" },
    { id: "25", firstname: "Yara", lastname: "Young", email: "yara.young@example.com", role: "admin" },
    { id: "26", firstname: "Zack", lastname: "King", email: "zack.king@example.com", role: "editor" },
    { id: "27", firstname: "Anna", lastname: "Wright", email: "anna.wright@example.com", role: "player" },
    { id: "28", firstname: "Ben", lastname: "Lopez", email: "ben.lopez@example.com", role: "all" },
    { id: "29", firstname: "Cara", lastname: "Hill", email: "cara.hill@example.com", role: "admin" },
    { id: "30", firstname: "Derek", lastname: "Scott", email: "derek.scott@example.com", role: "editor" },
];


export const getUsers = async (page: number, perPage: number, search: IUserSearch) => {
    try {

        // const response = await fetch(`${BACKEND_BASE_URL}/api/users?page=${page}&perPage=${perPage}&role=${search.role}&searchBy=${search.searchBy}&searchValue=${search.value}`);
        // return await response.json();

        console.log(page, perPage, search);
        
        return new Promise<IUserList>((resolve) => {
            resolve({
                total: users.length,
                data: users
            });
        });
    } catch {
        return Promise.reject("Une erreur est survenue lors du chargement des utilisateurs. Veuillez réessayer.");
    }
}

export const getUser = async (id: string) => {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/users/${id}`);
        return await response.json();
    } catch {
        return Promise.reject("Une erreur est survenue lors du chargement de l'utilisateur. Veuillez réessayer.");
    }
}


export async function updateUser(user: IUser) {
    
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(user)
        })
        return await response.json();
    } catch {
        return Promise.reject("Une erreur est survenue lors de la modification de l'utilisateur. Veuillez réessayer.");
    }
}


export async function deleteUser(id: string) {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/users/${id}`, {
            method: "DELETE",
        })
        return await response.json();
    } catch {
        return Promise.reject("Une erreur est survenue lors de la suppression de l'utilisateur. Veuillez réessayer.");
    }
}
