import { useState, useEffect } from 'react';
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('products');
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('products');
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setCurrentPage('products');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('login');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (currentPage === 'login') {
    return (
      <Login 
        onLogin={handleLogin}
        switchToRegister={() => setCurrentPage('register')}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <Register 
        onRegister={handleRegister}
        switchToLogin={() => setCurrentPage('login')}
      />
    );
  }

  return <Products user={user} onLogout={handleLogout} />;
}

export default App;
