import React, { useEffect, useState } from "react"

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
import { useSnackBarStore } from "@src/reducers/snackbar.reducer"

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  const theme = useTheme()
  const { showSnackBar } = useSnackBarStore()


  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
    } catch (error) {
      if (error instanceof Error) {
        showSnackBar(error.message, 'error')
      }else{
        showSnackBar('Une erreur est survenue lors de l\'inscription. Veuilllez réessayer.', 'error')
      }
    } finally {
      setLoading(false)
      console.log("Login process finished")
    }
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
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <CustomTextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <CustomTextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Connexion en cours..." : "Connexion"}
            </Button>
            <Link
              onClick={() => navigate("/register")}
              variant="body2"
              sx={{ color: theme.palette.mode === 'dark' ? "rgb(192, 192, 192)" : "rgb(25, 25, 25)" }}
            >
              {"Vous n'avez pas de compte ? Inscrivez-vous"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginPage
