import { IPasswords, IProfile } from "@src/types/profile.type";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

export const updateProfile = async (profile: IProfile): Promise<IProfile> => {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du profil');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (passwordChange: IPasswords): Promise<void> => {
    try {
        const response = await fetch(`${BACKEND_BASE_URL}/profile/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordChange),
        });

        if (!response.ok) {
            throw new Error('Erreur lors du changement de mot de passe');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteUserAccount = async (): Promise<void> => {
    const response = await fetch(`${BACKEND_BASE_URL}/profile/delete`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du compte');
    }
};