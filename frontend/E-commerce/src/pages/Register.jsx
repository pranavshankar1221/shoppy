import { useState } from 'react';
import axios from 'axios';

export default function Register({ onRegister, switchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onRegister(response.data.user);
    } catch (err) {
      console.error('Registration error:', err);
      if (err.code === 'ERR_NETWORK') {
        // Fallback for demo when backend is not running
        const mockUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email
        };
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify(mockUser));
        onRegister(mockUser);
      } else {
        setError(err.response?.data?.message || 'Registration failed. Backend server may not be running.');
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: '30px'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    input: {
      padding: '15px',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      fontSize: '16px',
      transition: 'border-color 0.3s',
      outline: 'none'
    },
    button: {
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      padding: '15px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    error: {
      color: '#dc3545',
      textAlign: 'center',
      marginBottom: '15px'
    },
    switchText: {
      textAlign: 'center',
      marginTop: '20px',
      color: '#666'
    },
    switchLink: {
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🛍️ Join ShopEasy</h2>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            style={styles.input}
            required
          />
          <button 
            type="submit" 
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <div style={styles.switchText}>
          Already have an account? 
          <span style={styles.switchLink} onClick={switchToLogin}> Login here</span>
        </div>
      </div>
    </div>
  );
}