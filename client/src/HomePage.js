import React, { useState, useEffect } from 'react'; // Import react and its hooks, but what is the useEffect exactly. got it from a git sorce
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
function HardwareManager({ hwSetName, projectId }) {//here is the new function that we created. handles the checkout of a single hardware set

  const [qty, setQty] = useState(0); // quant user wants to check out
  const [available, setAvailable] = useState(null); // how much hardware is avalible now
  const [capacity, setCapacity] = useState(null); // hardware capacity of this set
  const [message, setMessage] = useState(""); // show if the message workd or not 
  const [isLoadingHwInfo, setIsLoadingHwInfo] = useState(true); // loading state for hardware info
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false); // loading state for checkout 



  // connect to backend and get the capacity and avalibility like in the past hw
  useEffect(() => {
    setIsLoadingHwInfo(true);
    fetch("/get_hw_info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hwSetName })//get the name to the hardware set
    })
      .then(res => res.json())//convert response to json...chat helped me with this
      .then(data => {
        setAvailable(data.availability); // update available units from back-end
        setCapacity(data.capacity); // update total capacity from back-end too
      })
      .catch(err => {
        console.error("Error loading hardware info", err);
      })
      .finally(() => {
        setIsLoadingHwInfo(false);
      });
  }, [hwSetName]);//if hardware name changes run again
//lets say user types in a new quantity
  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value)); // take in the new input quantity
  };
//if user clicks the checkout button
  const handleCheckout = () => {
    //dont let the user checkout more than availble like in the homework
    if (qty > available) {
      setMessage("Opps! You cant check out more than available.");
      return;
    }
//now send this to the back-end
    setIsCheckoutLoading(true);
    fetch("/check_out", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hwSetName, qty, projectId })//we need these set names to display 
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage("YaySuccessfully checked out!");
          setAvailable(prev => prev - qty); // update teh amount in the UI/frontend dispaly
        } else {
          setMessage("Checkout failed.");//show the failure message
        }
      })
      .catch(err => {
        console.error("Checkout error", err);
        setMessage("An error occurred.");//if there is error
      })
      .finally(() => {
        setIsCheckoutLoading(false);
      });
  };

//got stuck so used chat to generate the reutnr funciton to fix past errors
  return (
    <div style={{ border: "1px solid gray", padding: "16px", marginBottom: "20px" }}> 
      <h3>Checkout {hwSetName}</h3>
      {isLoadingHwInfo ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <LoadingSpinner size={24} />
          <p>Loading hardware info...</p>
        </div>
      ) : (
        <>
          <p>Capacity: {capacity}</p>
          <p>Available: {available}</p>
          <input type="number" value={qty} onChange={handleQtyChange} min="1" />
          <button onClick={handleCheckout} disabled={isCheckoutLoading}>
            {isCheckoutLoading ? <LoadingSpinner size={16} /> : 'Check Out'}
          </button>
          <p>{message}</p>
        </>
      )}
    </div>
  );
}



function HomePage({ onLogout, user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem('userId');
  navigate('/');
  };
  //const [input, setInput] = useState('');//demo form

  const projectId = "test-project-id"; // replace with real project ID later...but find out from team waht this does exaclty
  const userId = localStorage.getItem('userId');
  
  const styles = { button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4da6ff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginBottom: '10px'
    }}
  


  return (
    <div className="card">
      <h2>Welcome, {userId}!</h2>
      <p>You are logged in succsefully</p>

{/* the differnt sets */}
      <HardwareManager hwSetName="HWSet1" projectId={projectId} />
      <HardwareManager hwSetName="HWSet2" projectId={projectId} />
{/* logout button */}
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default HomePage;






