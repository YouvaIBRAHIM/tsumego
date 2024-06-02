export interface IUser{
    id: string
    firstname: string
    lastname: string
    email: string
    role: "all" | "admin" | "editor" | "player"
}

export interface IUserSearch{
    value: string, 
    searchBy: "name" | "email",
    orderBy: "name" | "email",
    role: IUser["role"],
    order: "asc" | "desc"

}

export interface IUserList{
    data: IUser[]
    total: number
}