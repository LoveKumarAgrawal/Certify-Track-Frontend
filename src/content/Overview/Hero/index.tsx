import { addLoggedIn } from '@/redux/features/authSlice';
import { AppDispatch } from '@/redux/store';
import {
  Box,
  Button,
  Grid,
  Typography,
  styled,
  TextField,
  Card,
  CardContent,
  Container,
  Hidden
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const GlaLogo = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(20)};
    height: ${theme.spacing(20)};
    
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: -15px auto ${theme.spacing(0)};

    img {
      width: 80%;
      height: 80%;
      display: block;
    }
`
);

function Hero() {

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function login(e) {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if(res.ok) {
        const data = await res.json();
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("user", JSON.stringify(data))
        dispatch(addLoggedIn());
        router.push("/management/addfile"); 
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }



  return (
    <Grid container style={{ height: "90vh" }}>
      <Hidden mdDown>
        <Grid item md={8} lg={8} className='image'>
          <img src="https://media.collegedekho.com/media/img/institute/crawled_images/gla1.jpg" alt="" />
        </Grid>
      </Hidden>
      <Grid 
        item 
        xs={12}
        md={4} 
        lg={4} 
        className='loginContainer'
        > 
        <form onSubmit={login}>
        <Container maxWidth="xl">
          <Card className='loginContainerCard'>
            <CardContent sx={{ padding: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <GlaLogo>
                    <img src="https://upload.wikimedia.org/wikipedia/en/4/42/GLA_University_logo.png" alt="logo" />
                  </GlaLogo>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h3" align="center">
                    Log in
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="username"
                    label="Username"
                    variant="standard"
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="password"
                    label="Password"
                    type="password"
                    variant="standard"
                    fullWidth 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ fontSize: '1.1rem', marginTop: 2 }}
                    type='submit'
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </form>
      </Grid>
    </Grid>
  );
}

export default Hero;
