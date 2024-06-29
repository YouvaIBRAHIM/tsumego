import React, { useEffect, useState } from "react"

import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Typography,
} from "@mui/material"

import { useAuthStore } from "@reducers/auth.reducer"
import { useNavigate } from "react-router-dom"

import CustomTextField from "@src/components/TextField"

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useAuthStore((state) => state.login)
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [user, navigate])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email, password)
    } catch (error) {
      console.error("Login failed:", error)
      setError("Login failed. Please check your username and password.")
    } finally {
      setLoading(false)
      console.log("Login process finished")
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
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
              sx={{ color: "rgb(192, 192, 192)" }}
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
