import { useState } from 'react';
import Login from './components/Login';
import SweetList from './components/SweetList';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <div className="container">
      <div className="card">
        <h1>🍬 Sweet Shop</h1>
        {loggedIn ? (
          <SweetList />
        ) : (
          <Login onLogin={() => setLoggedIn(true)} />
        )}
      </div>
    </div>
  );
}
