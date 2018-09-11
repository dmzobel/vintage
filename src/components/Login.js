import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './Login.style.css';

const Login = props => {
  return (
    <div className="login-container">
      <Paper style={{ padding: '10px 30px' }}>
        <h2>Login</h2>
        <form className="login-form">
          <TextField required id="emailInput" label="Email" margin="normal" />
          <TextField
            required
            id="password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <Button variant="contained">Submit</Button>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
