import React, { useState } from "react"

import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Typography,
  useTheme,
} from "@mui/material"

import { useAuthStore } from "@reducers/auth.reducer"
import { useNavigate } from "react-router-dom"

import CustomTextField from "@src/components/TextField"

import { IUserRegister } from "@src/types/user.type"
import { useSnackBarStore } from "@src/reducers/snackbar.reducer"

const RegisterPage: React.FC = () => {
  const [user, setUser] = useState<IUserRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const { register } = useAuthStore()
  const navigate = useNavigate()
  const theme = useTheme()
  const { showSnackBar } = useSnackBarStore()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      await register(user)
      navigate("/")
    } catch (error) {
      if (error instanceof Error) {
        showSnackBar(error.message, 'error')
      }else{
        showSnackBar('Une erreur est survenue lors de l\'inscription. Veuilllez réessayer.', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  const onSetUser = (key: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={theme.palette.mode === 'dark' ? 'logo-dark.png' : 'logo-light.png'}
            alt='GoHub logo'
            loading="lazy"
            height={150}
          />
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <CustomTextField
              label="Nom"
              variant="outlined"
              value={user.lastName}
              onChange={(e) => onSetUser("lastName", e.target.value)}
              required
            />
            <CustomTextField
              label="Prénom"
              variant="outlined"
              value={user.firstName}
              onChange={(e) => onSetUser("firstName", e.target.value)}
              required
            />
            <CustomTextField
              label="Email"
              type="email"
              variant="outlined"
              value={user.email}
              onChange={(e) => onSetUser("email", e.target.value)}
              required
            />
            <CustomTextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              value={user.password}
              onChange={(e) => onSetUser("password", e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Inscription en cours..." : "Inscription"}
            </Button>
            <Link
              onClick={() => navigate("/login")}
              variant="body2"
              sx={{ color: theme.palette.mode === 'dark' ? "rgb(192, 192, 192)" : "rgb(25, 25, 25)" }}
            >
              {"Vous avez déjà un compte ? Connectez-vous"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default RegisterPage
