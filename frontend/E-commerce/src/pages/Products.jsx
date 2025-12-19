import axios from "axios";
import { useEffect, useState } from "react";
import Snowfall from 'react-snowfall';

export default function Products({ user, onLogout }) {
  const [products, setProducts] = useState([
    { 
      _id: '1', 
      name: 'MacBook Pro', 
      price: 129999, 
      image: 'https://images.unsplash.com/photo-1717865499857-ec35ce6e65fa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMGFpcnxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Powerful laptop for professionals'
    },
    { 
      _id: '2', 
      name: 'iPhone 15 Pro', 
      price: 134900, 
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
      description: 'Latest iPhone with advanced features'
    },
    { 
      _id: '3', 
      name: 'AirPods Pro', 
      price: 24900, 
      image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-3-hero-select-202509_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=1758077264181',
      description: 'Premium wireless earbuds'
    },
    { 
      _id: '4', 
      name: 'Samsung 4K TV', 
      price: 89999, 
      image: 'https://static.toiimg.com/thumb/resizemode-4,msid-106325236,width-1070,imgv-0/106325236.jpg',
      description: '55-inch Smart 4K Ultra HD TV'
    },
    { 
      _id: '5', 
      name: 'Sony Headphones', 
      price: 15999, 
      image: 'https://m.media-amazon.com/images/I/61RahTQtAqL._AC_UF1000,1000_QL80_.jpg',
      description: 'Noise-cancelling wireless headphones'
    },
    { 
      _id: '6', 
      name: 'Gaming Keyboard', 
      price: 8999, 
      image: 'https://images.ctfassets.net/w5r1fvmogo3f/2Sx0d0xP1sqQ4lqnNghSTr/f7fc939bbb9f196bdd62805af0642dd6/3f91bf6de6ad4e3ca3c86bd3b46264c5.jpg',
      description: 'RGB mechanical gaming keyboard'
    },
    { 
      _id: '7', 
      name: 'Canon DSLR Camera', 
      price: 65999, 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzWcbDYF583zzJxbkkB8D5WFnG53FgIEQQxA&s',
      description: 'Professional DSLR with 24MP sensor'
    },
    { 
      _id: '8', 
      name: 'Nike Running Shoes', 
      price: 7999, 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      description: 'Comfortable running shoes for athletes'
    },
    { 
      _id: '9', 
      name: 'Bluetooth Speaker', 
      price: 3999, 
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
      description: 'Portable wireless speaker with bass'
    },
    { 
      _id: '10', 
      name: 'Smart Watch', 
      price: 12999, 
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
      description: 'Fitness tracker with heart rate monitor'
    },
    { 
      _id: '11', 
      name: 'Wireless Mouse', 
      price: 2499, 
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
      description: 'Ergonomic wireless mouse for productivity'
    },
    { 
      _id: '12', 
      name: 'Gaming Chair', 
      price: 18999, 
      image: 'https://images-cdn.ubuy.co.in/693c1fd0b6f88dabf106bc37-gtplayer-gaming-chair-computer-chair.jpg',
      description: 'Ergonomic gaming chair with lumbar support'
    }
  ]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch(() => {
        console.log('Backend not available, using default products');
      });
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => 
        item._id === product._id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item._id === id ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePayment = (method) => {
    alert(`Payment of ₹${getTotalPrice()} via ${method} successful!`);
    setCart([]);
    setShowPayment(false);
    setShowCart(false);
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden'
    },
    navbar: {
      backgroundColor: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    navContent: {
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logo: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#007bff',
      textDecoration: 'none'
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    navLink: {
      color: '#333',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: '500',
      transition: 'color 0.3s'
    },
    hero: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '80px 20px',
      textAlign: 'center'
    },
    heroContent: {
      maxWidth: '900px',
      margin: '0 auto',
      width: '100%'
    },
    heroTitle: {
      fontSize: 'clamp(32px, 5vw, 48px)',
      fontWeight: 'bold',
      marginBottom: '20px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    heroSubtitle: {
      fontSize: '20px',
      marginBottom: '30px',
      opacity: 0.9
    },
    heroButton: {
      backgroundColor: '#fff',
      color: '#667eea',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '25px',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    main: {
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    sectionTitle: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: '40px'
    },
    cartButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'all 0.3s'
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '25px',
      marginBottom: '50px',
      width: '100%'
    },
    productCard: {
      backgroundColor: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      border: '1px solid #e9ecef'
    },
    productImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    productInfo: {
      padding: '25px'
    },
    productBadge: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      display: 'inline-block',
      marginBottom: '15px'
    },
    productName: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px'
    },
    productDescription: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '15px',
      lineHeight: '1.5'
    },
    productPrice: {
      fontSize: '28px',
      color: '#007bff',
      fontWeight: 'bold',
      marginBottom: '20px'
    },
    addButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '15px 25px',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0,123,255,0.3)'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '15px',
      maxWidth: '600px',
      width: '95%',
      maxHeight: '85vh',
      overflow: 'auto'
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #eee',
      marginBottom: '10px'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    quantityButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '16px'
    },
    total: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      margin: '20px 0',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px'
    },
    paymentButtons: {
      display: 'grid',
      gap: '15px',
      marginTop: '20px'
    },
    paymentButton: {
      padding: '15px',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'all 0.3s'
    },
    closeButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '15px'
    }
  };

  return (
    <div style={styles.container}>
      <Snowfall snowflakeCount={100} />
      {/* Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <a href="#" style={styles.logo}>🛍️ ShopEasy</a>
          <div style={styles.navLinks}>
            <a href="#" style={{...styles.navLink, display: window.innerWidth < 768 ? 'none' : 'block'}}>Home</a>
            <a href="#" style={{...styles.navLink, display: window.innerWidth < 768 ? 'none' : 'block'}}>Products</a>
            <a href="#" style={{...styles.navLink, display: window.innerWidth < 768 ? 'none' : 'block'}}>About</a>
            <a href="#" style={{...styles.navLink, display: window.innerWidth < 768 ? 'none' : 'block'}}>Contact</a>
            {user && (
              <span style={{...styles.navLink, fontWeight: 'bold'}}>Hi, {user.name}!</span>
            )}
            <button
              style={{...styles.cartButton, backgroundColor: '#dc3545', marginLeft: '10px'}}
              onClick={onLogout}
            >
              Logout
            </button>
            <button 
              style={styles.cartButton}
              onClick={() => setShowCart(true)}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to ShopEasy</h1>
          <p style={styles.heroSubtitle}>Discover amazing products at unbeatable prices</p>
          <button 
            style={styles.heroButton}
            onClick={() => document.getElementById('products').scrollIntoView({behavior: 'smooth'})}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <main style={styles.main}>
        <h2 id="products" style={styles.sectionTitle}>Featured Products</h2>
        <div style={styles.productsGrid}>
          {products.map((product) => (
            <div
              key={product._id}
              style={styles.productCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <img 
                src={product.image} 
                alt={product.name}
                style={styles.productImage}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300/007bff/ffffff?text=' + encodeURIComponent(product.name);
                }}
              />
              <div style={styles.productInfo}>
                <span style={styles.productBadge}>New</span>
                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.productDescription}>{product.description}</p>
                <p style={styles.productPrice}>₹{product.price.toLocaleString()}</p>
                <button
                  style={styles.addButton}
                  onClick={() => addToCart(product)}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#007bff';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showCart && (
        <div style={styles.modal} onClick={() => setShowCart(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>🛒 Shopping Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item._id} style={styles.cartItem}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px'}}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60/007bff/ffffff?text=' + encodeURIComponent(item.name.charAt(0));
                        }}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        ₹{item.price.toLocaleString()} each
                      </div>
                    </div>
                    <div style={styles.quantityControls}>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        style={styles.quantityButton}
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        style={{...styles.closeButton, marginTop: 0, marginLeft: '10px'}}
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div style={styles.total}>
                  Total: ₹{getTotalPrice().toLocaleString()}
                </div>
                <button
                  style={{...styles.addButton, backgroundColor: '#007bff'}}
                  onClick={() => setShowPayment(true)}
                >
                  Proceed to Payment
                </button>
              </>
            )}
            <button style={styles.closeButton} onClick={() => setShowCart(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showPayment && (
        <div style={styles.modal} onClick={() => setShowPayment(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>💳 Payment Options</h2>
            <div style={styles.total}>
              Total Amount: ₹{getTotalPrice().toLocaleString()}
            </div>
            <div style={styles.paymentButtons}>
              <button
                style={{...styles.paymentButton, backgroundColor: '#4CAF50', color: 'white'}}
                onClick={() => handlePayment('Google Pay')}
              >
                📱 Google Pay
              </button>
              <button
                style={{...styles.paymentButton, backgroundColor: '#2196F3', color: 'white'}}
                onClick={() => handlePayment('PhonePe')}
              >
                📱 PhonePe
              </button>
              <button
                style={{...styles.paymentButton, backgroundColor: '#9C27B0', color: 'white'}}
                onClick={() => handlePayment('Paytm')}
              >
                📱 Paytm
              </button>
              <button
                style={{...styles.paymentButton, backgroundColor: '#FF9800', color: 'white'}}
                onClick={() => handlePayment('Amazon Pay')}
              >
                📱 Amazon Pay
              </button>
            </div>
            <button style={styles.closeButton} onClick={() => setShowPayment(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}