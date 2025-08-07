import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function HardwareManager({ hwSetName, projectId, userId }) {

  const [checkoutQty, setCheckoutQty] = useState(1);
  const [checkinQty, setCheckinQty] = useState(1);
  const [available, setAvailable] = useState(null);
  const [capacity, setCapacity] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoadingHwInfo, setIsLoadingHwInfo] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isCheckinLoading, setIsCheckinLoading] = useState(false); 



  // connect to backend and get the capacity and availability
  useEffect(() => {
    setIsLoadingHwInfo(true);
    fetch(`/get_hw_info?hwSetName=${encodeURIComponent(hwSetName)}`)
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch hardware info');
        setAvailable(data.availability);
        setCapacity(data.capacity);
      })
      .catch(err => {
        console.error("Error loading hardware info", err);
        setMessage("Failed to load hardware information");
      })
      .finally(() => {
        setIsLoadingHwInfo(false);
      });
  }, [hwSetName]);
  const handleCheckout = () => {
    if (checkoutQty > available) {
      setMessage("Cannot check out more than available units.");
      return;
    }
    if (checkoutQty <= 0) {
      setMessage("Please enter a valid quantity.");
      return;
    }

    setIsCheckoutLoading(true);
    setMessage("");
    
    fetch("/check_out", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        hwSetName, 
        qty: checkoutQty, 
        projectId,
        userId 
      })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || 'Checkout failed');
        setMessage("Successfully checked out!");
        setAvailable(prev => prev - checkoutQty);
        setCheckoutQty(1);
      })
      .catch(err => {
        console.error("Checkout error", err);
        setMessage(err.message || "An error occurred during checkout.");
      })
      .finally(() => {
        setIsCheckoutLoading(false);
      });
  };

  const handleCheckin = () => {
    if (checkinQty <= 0) {
      setMessage("Please enter a valid quantity.");
      return;
    }

    setIsCheckinLoading(true);
    setMessage("");
    
    fetch("/check_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        hwSetName, 
        qty: checkinQty, 
        projectId,
        userId 
      })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || 'Check-in failed');
        setMessage("Successfully checked in!");
        setAvailable(prev => prev + checkinQty);
        setCheckinQty(1);
      })
      .catch(err => {
        console.error("Check-in error", err);
        setMessage(err.message || "An error occurred during check-in.");
      })
      .finally(() => {
        setIsCheckinLoading(false);
      });
  };

  const styles = {
    hwContainer: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      backgroundColor: "#fff"
    },
    header: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#333"
    },
    info: {
      marginBottom: "15px",
      padding: "10px",
      backgroundColor: "#f8f9fa",
      borderRadius: "5px"
    },
    section: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #e0e0e0",
      borderRadius: "5px"
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px"
    },
    input: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "100px"
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#4da6ff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px"
    },
    checkinButton: {
      padding: "10px 15px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px"
    },
    message: {
      padding: "10px",
      marginTop: "10px",
      borderRadius: "4px",
      backgroundColor: message.includes("Successfully") ? "#d4edda" : "#f8d7da",
      color: message.includes("Successfully") ? "#155724" : "#721c24",
      border: message.includes("Successfully") ? "1px solid #c3e6cb" : "1px solid #f5c6cb"
    }
  };

  return (
    <div style={styles.hwContainer}> 
      <h3 style={styles.header}>Hardware Set: {hwSetName}</h3>
      {isLoadingHwInfo ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <LoadingSpinner size={24} />
          <p>Loading hardware info...</p>
        </div>
      ) : (
        <>
          <div style={styles.info}>
            <p><strong>Total Capacity:</strong> {capacity} units</p>
            <p><strong>Available:</strong> {available} units</p>
            <p><strong>Checked Out:</strong> {capacity - available} units</p>
          </div>

          <div style={styles.section}>
            <h4>Check Out Hardware</h4>
            <div style={styles.inputGroup}>
              <label>Quantity:</label>
              <input 
                type="number" 
                value={checkoutQty} 
                onChange={(e) => setCheckoutQty(parseInt(e.target.value) || 1)}
                min="1" 
                max={available}
                style={styles.input}
              />
              <button 
                onClick={handleCheckout} 
                disabled={isCheckoutLoading || available === 0}
                style={styles.button}
              >
                {isCheckoutLoading ? <LoadingSpinner size={16} /> : 'Check Out'}
              </button>
            </div>
          </div>

          <div style={styles.section}>
            <h4>Check In Hardware</h4>
            <div style={styles.inputGroup}>
              <label>Quantity:</label>
              <input 
                type="number" 
                value={checkinQty} 
                onChange={(e) => setCheckinQty(parseInt(e.target.value) || 1)}
                min="1"
                style={styles.input}
              />
              <button 
                onClick={handleCheckin} 
                disabled={isCheckinLoading}
                style={styles.checkinButton}
              >
                {isCheckinLoading ? <LoadingSpinner size={16} /> : 'Check In'}
              </button>
            </div>
          </div>

          {message && (
            <div style={styles.message}>
              {message}
            </div>
          )}
        </>
      )}
    </div>
  );
}



function HomePage() {
  const navigate = useNavigate();
  const { userId, projectId, hwSetName } = useParams();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('projectId');
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(`/project/${userId}/${encodeURIComponent(projectId)}`);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      boxSizing: 'border-box'
    },
    card: {
      backgroundColor: '#fff',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '600px',
      textAlign: 'center',
      boxSizing: 'border-box'
    },
    title: {
      color: '#333',
      marginBottom: '10px',
      fontSize: '28px'
    },
    subtitle: {
      color: '#666',
      fontSize: '16px',
      marginBottom: '30px'
    },
    buttonsContainer: {
      display: 'flex',
      gap: '15px',
      flexDirection: 'column',
      marginTop: '30px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginBottom: '10px'
    }
  };

  if (!userId || !projectId || !hwSetName) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Invalid URL</h2>
          <p>Missing required parameters</p>
          <button style={styles.button} onClick={() => navigate('/')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Hardware Management</h1>
        <p style={styles.subtitle}>Project: {projectId} | User: {userId}</p>

        <HardwareManager 
          hwSetName={hwSetName} 
          projectId={projectId} 
          userId={userId}
        />

        <div style={styles.buttonsContainer}>
          <button style={styles.button} onClick={handleGoBack}>
            Back to Project
          </button>
          <button style={styles.button} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;






