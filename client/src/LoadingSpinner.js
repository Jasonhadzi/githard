import React from 'react';

function LoadingSpinner({ size = 16 }) {
  const styles = {
    spinner: {
      display: 'inline-block',
      width: `${size}px`,
      height: `${size}px`,
      border: '2px solid #f3f3f3',
      borderTop: '2px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  // Add CSS keyframes for the spin animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div style={styles.spinner}></div>;
}

export default LoadingSpinner;