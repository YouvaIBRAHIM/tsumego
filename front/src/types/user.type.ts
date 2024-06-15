export interface IUser{
    id: string
    first_name: string
    last_name: string
    email: string
    roles: IRole['role'][]
}

export interface IRole{
    role: "all" | "admin" | "editor" | "player"
}

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