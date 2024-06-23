import { AuthCheckResponse, IUserRegister, IValideUserRoles } from "@src/types/user.type";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


export interface LoginData {
    username: string;
    password: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: { role: IValideUserRoles[] };
}

export const login = async (loginData: LoginData): Promise<AuthResponse> => {
    const response = await fetch(`${BACKEND_BASE_URL}/api/token/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
};


function getCsrfToken(): string | null {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('csrftoken'));
    return cookie ? cookie.split('=')[1] : null;
}

export async function fetchAccess(email: string, password: string): Promise<AuthCheckResponse> {
    const csrfToken = getCsrfToken();

    const response = await fetch(`${BACKEND_BASE_URL}/api/login/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const { user: loggedUser} = await response.json();
    return { user: { username: loggedUser.username, email: loggedUser.email, roles: loggedUser.roles } };
}

export async function fetchRegister(user: IUserRegister): Promise<AuthCheckResponse> {
    const csrfToken = getCsrfToken();

    const response = await fetch(`${BACKEND_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '',
        },
        body: JSON.stringify(user),
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const { user: registeredUser} = await response.json();
    return { user: { username: registeredUser.username, email: registeredUser.email, roles: registeredUser.roles } };
}

export async function fetchLogout(): Promise<Response> {
    const csrfToken = getCsrfToken();

    const response = await fetch(`${BACKEND_BASE_URL}/api/logout/`, {
        method: 'POST',
        headers: {
        'X-CSRFToken': csrfToken || '',
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response;
}

export async function fetchCheckAuth(): Promise<AuthCheckResponse> {
    const response = await fetch(`${BACKEND_BASE_URL}/api/check-auth/`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const { user: checkedUser} = await response.json();
    return { user: { username: checkedUser.username, email: checkedUser.email, roles: checkedUser.roles } };
}