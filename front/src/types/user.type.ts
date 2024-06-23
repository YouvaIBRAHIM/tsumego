export interface IUser{
    id: string
    first_name: string
    last_name: string
    email: string
    roles: IValideUserRoles[]
}

export interface IRole{
    role: "all" | "admin" | "editor" | "player"
}

export type IValideUserRoles = Exclude<IRole["role"], "all">;


export interface IUserSearch{
    value: string, 
    searchBy: "name" | "email",
    orderBy: "name" | "email",
    role: IRole['role'],
    order: "asc" | "desc"

}

export interface IUserList{
    data: IUser[]
    count: number
}

export interface AuthCheckResponse {
    user: { username: string; email: string; roles: IValideUserRoles[] };
}

export interface AuthState {
    token: string | null;
    user: { username: string; email: string; roles: IValideUserRoles[] } | null;
    setToken: (token: string | null) => void;
    setUser: (user: { username: string; email: string; roles: IValideUserRoles[] } | null) => void;
    login: (username: string, password: string) => Promise<void>;
    register: (user: IUserRegister) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}

export interface IUserRegister{
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
