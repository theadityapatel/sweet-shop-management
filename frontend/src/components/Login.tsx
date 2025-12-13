import { useState } from 'react';
import { apiFetch } from '../api/client';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      localStorage.setItem('token', res.token);
      onLogin();
    } catch {
      alert('Login failed');
    }
  }

 return (
  <>
    <h2>Login</h2>
    <input
      placeholder="Email"
      onChange={e => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      onChange={e => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Login</button>
  </>
);

}
