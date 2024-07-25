import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Container, Box, TextField, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              background: 'url(https://img.freepik.com/free-vector/doctors-personalized-prescriptive-analytics-big-data-healthcare-personalized-medicine-big-data-patient-care-predictive-analytics-concept-bright-vibrant-violet-isolated-illustration_335657-450.jpg) no-repeat center center',
              backgroundSize: 'fix',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box display="flex" flexDirection="column" justifyContent="center" sx={{ width: '100%', p: 3 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden' }}>
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)',
                  color: 'white',
                  padding: '16px 32px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h4" component="div" gutterBottom>
                  Login
                </Typography>
              </Box>
              <CardContent sx={{ padding: '32px' }}>
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"






































                    
                    fullWidth
                    sx={{
                      mt: 2,
                      padding: '12px',
                      background: 'linear-gradient(45deg, #c4f5c7 10%, #87CEEB 100%, #FF8E53 5%)',
                      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    }}
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
