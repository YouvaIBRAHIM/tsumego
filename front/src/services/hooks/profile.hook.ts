import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateProfile, changePassword, deleteUserAccount } from '@services/apis/profile.api';
import { IPasswords, IProfile } from '@src/types/profile.type';
import { useAuthStore } from '@src/reducers/auth.reducer';
import { useSnackBarStore } from '@src/reducers/snackbar.reducer';

interface IConfirmationModal {
    title: string
    action: () => void
}
export const useProfile = () => {
    const { showSnackBar } = useSnackBarStore();
    
    const [profile, setProfile] = useState<IProfile>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    const [passwords, setPasswords] = useState<IPasswords>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [confirmationModal, setConfirmationModal] = useState<IConfirmationModal | null>(null);

    const { logout, user } = useAuthStore()

    const updateProfileMutation = useMutation({        
        mutationFn: (profile: IProfile) => updateProfile(profile), 
        onSuccess: () => {
            setConfirmationModal(null);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: (passwordChange: IPasswords) => changePassword(passwordChange), 
        onSuccess: () => {
            setConfirmationModal(null);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: () => deleteUserAccount(),
        onSuccess: () => {
            setConfirmationModal(null);
            logout()
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleProfileChange = (key: keyof IProfile, value: string) => {
        setProfile((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handlePasswordChange = (key: keyof IPasswords, value: string) => {
        setPasswords((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmitProfile = () => {
        setConfirmationModal({
            title: 'Confirmez-vous les modifications de votre profil ?',
            action: () => updateProfileMutation.mutate(profile)
        });
    };

    const handleSubmitPasswordChange = () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            showSnackBar('Les nouveaux mots de passe ne correspondent pas', 'warning');
            return;
        }
        setConfirmationModal({
            title: 'Confirmez-vous les modifications de votre mot de passe ?',
            action: () => changePasswordMutation.mutate(passwords)
        });
    };

    const handleDeleteUserAccount = () => {
        setConfirmationModal({
            title: 'Voulez-vous vraiment supprimer votre compte ?',
            action: () => deleteUserMutation.mutate()
        });
    };

    const closeConfirmationModal = () => {
        setConfirmationModal(null);
    };

    useEffect(() => {
        if (user) {
            setProfile({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            })
        }
    }, [user])
    return {
        profile,
        passwords,
        handleProfileChange,
        handlePasswordChange,
        handleSubmitProfile,
        handleSubmitPasswordChange,
        handleDeleteUserAccount,
        confirmationModal,
        closeConfirmationModal
    };
};
