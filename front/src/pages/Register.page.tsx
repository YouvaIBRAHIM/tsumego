import React, { useState } from 'react';
import { Container, Box, Typography, Button, Paper, Alert, Link } from '@mui/material';
import { useAuthStore } from '@reducers/auth.reducer';
import { useNavigate } from 'react-router-dom';
import { IUserRegister } from '@src/types/user.type';
import CustomTextField from '@src/components/TextField';

const RegisterPage: React.FC = () => {
    const [ user, setUser ] = useState<IUserRegister>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {register} = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await register(user);
            navigate('/')
        } catch (error) {
            setError("Registration failed. Please check your input.");
        } finally {
            setLoading(false);
        }
    };

    const onSetUser = (key: string, value: string) => {
        setUser(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography component="h1" variant="h5">
                        Inscription
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <CustomTextField
                            label="Nom"
                            variant="outlined"
                            value={user.lastName}
                            onChange={(e) => onSetUser('lastName', e.target.value)}
                            required
                        />
                        <CustomTextField
                            label="Prénom"
                            variant="outlined"
                            value={user.firstName}
                            onChange={(e) => onSetUser('firstName', e.target.value)}
                            required
                        />
                        <CustomTextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={user.email}
                            onChange={(e) => onSetUser('email', e.target.value)}
                            required
                        />
                        <CustomTextField
                            label="Mot de passe"
                            type="password"
                            variant="outlined"
                            value={user.password}
                            onChange={(e) => onSetUser('password', e.target.value)}
                            required
                        />
                        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                        >
                            {loading ? 'Inscription en cours...' : 'Inscription'}
                        </Button>
                        <Link onClick={() => navigate("/login")} variant="body2" sx={{ color: 'rgb(192, 192, 192)' }}>
                            {"Vous avez déjà un compte ? Connectez-vous"}
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;