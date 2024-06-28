import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  Avatar,
  CardContent
} from '@mui/material';
import { useProfile } from '@services/hooks/profile.hook';
import ConfirmationModal from '@components/ConfirmationModal';
import { useAuthStore } from '@src/reducers/auth.reducer';
import { formatRoles } from '@src/services/roles.mapper.service';
import { UserProfileCardSkeleton, UserProfileFormSkeleton, UserProfilePasswordFormSkeleton } from '@src/components/Skeletons/UserProfileSkeletons';
import CustomTextField from '@src/components/TextField';

const Profile = () => {
  const {
      profile,
      passwords,
      handleProfileChange,
      handlePasswordChange,
      handleSubmitProfile,
      handleSubmitPasswordChange,
      handleDeleteUserAccount,
      confirmationModal,
      closeConfirmationModal
  } = useProfile();

  const { user } = useAuthStore()

  return (
      <Box>
          <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                  <Card sx={{ position: 'sticky', top: 0 }}>
                      {
                          user 
                          ?
                          <CardContent sx={{ textAlign: 'center' }}>
                              <Avatar sx={{ width: 120, height: 120, margin: 'auto' }} />
                              <Typography variant="h4" sx={{ marginTop: 2 }}>
                                  {user?.username}
                              </Typography>
                              <Typography variant="h5" sx={{ marginTop: 2 }}>
                                  {formatRoles(user.roles)}
                              </Typography>
                              <Button
                                  variant="contained"
                                  color="error"
                                  sx={{ marginTop: 2 }}
                                  onClick={handleDeleteUserAccount}
                              >
                                  Supprimer mon compte
                              </Button>
                          </CardContent>
                          :
                          <UserProfileCardSkeleton />
                      }
                  </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                  <Card>
                      {
                        user 
                        ?
                          <CardContent>
                              <Typography variant="h6">Mettre à jour les informations personnelles</Typography>
                              <CustomTextField
                                  label="Nom d'utilisateur"
                                  name="username"
                                  value={profile.username}
                                  onChange={(e) => handleProfileChange('username', e.target.value)}
                              />
                              <CustomTextField
                                  label="Prénom"
                                  name="firstName"
                                  value={profile.firstName}
                                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                              />
                              <CustomTextField
                                  label="Nom"
                                  name="lastName"
                                  value={profile.lastName}
                                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                              />
                              <CustomTextField
                                  label="Email"
                                  name="email"
                                  value={profile.email}
                                  onChange={(e) => handleProfileChange('email', e.target.value)}
                              />
                              <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleSubmitProfile}>
                                  Mettre à jour
                              </Button>
                          </CardContent>
                        :
                          <UserProfileFormSkeleton />
                      }
                      
                  </Card>
                  <Card sx={{ marginTop: 4 }}>
                    {
                      user 
                      ?
                        <CardContent>
                            <Typography variant="h6">Changer le mot de passe</Typography>
                            <CustomTextField
                                label="Mot de passe actuel"
                                type="password"
                                name="currentPassword"
                                value={passwords.currentPassword}
                                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            />
                            <CustomTextField
                                label="Nouveau mot de passe"
                                type="password"
                                name="newPassword"
                                value={passwords.newPassword}
                                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            />
                            <CustomTextField
                                label="Confirmer le nouveau mot de passe"
                                type="password"
                                name="confirmPassword"
                                value={passwords.confirmPassword}
                                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            />
                            <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleSubmitPasswordChange}>
                                Changer le mot de passe
                            </Button>
                        </CardContent>
                      :
                        <UserProfilePasswordFormSkeleton />
                    }
                  </Card>
              </Grid>
          </Grid>
          {
              confirmationModal &&
              <ConfirmationModal
                  open={Boolean(confirmationModal)}
                  title={confirmationModal.title}
                  onConfirmation={confirmationModal.action}
                  onCancelation={() => closeConfirmationModal()}
              />
          }
      </Box>
  );
};

export default Profile;