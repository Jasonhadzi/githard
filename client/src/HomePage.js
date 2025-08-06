import React, { useState, useEffect } from 'react'; // Import react and its hooks, but what is the useEffect exactly. got it from a git sorce

function HardwareManager({ hwSetName, projectId }) {//here is the new function that we created. handles the checkout of a single hardware set
  const [qty, setQty] = useState(0); // quant user wants to check out
  const [available, setAvailable] = useState(null); // how much hardware is avalible now
  const [capacity, setCapacity] = useState(null); // hardware capacity of this set
  const [message, setMessage] = useState(""); // show if the message workd or not 

  // connect to backend and get the capacity and avalibility like in the past hw
  useEffect(() => {
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
      });
  };
//got stuck so used chat to generate the reutnr funciton to fix past errors
  return (
    <div style={{ border: "1px solid gray", padding: "16px", marginBottom: "20px" }}> 
      <h3>Checkout {hwSetName}</h3>
      <p>Capacity: {capacity}</p>
      <p>Available: {available}</p>
      <input type="number" value={qty} onChange={handleQtyChange} min="1" />
      <button onClick={handleCheckout}>Check Out</button>
      <p>{message}</p>
    </div>
  );
}

function HomePage({ onLogout, user }) {
  const [input, setInput] = useState('');//demo form
  const [response, setResponse] = useState('');//server response
  const projectId = "test-project-id"; // replace with real project ID later...but find out from team waht this does exaclty

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="card">
      <h2>Welcome, {user}!</h2>
      <p>You are logged in succsefully</p>

      <form onSubmit={handleSubmit}>
        <label>
          Your Input Request to Server:
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <div>Response from server: {response}</div>
{/* the differnt sets */}
      <HardwareManager hwSetName="HWSet1" projectId={projectId} />
      <HardwareManager hwSetName="HWSet2" projectId={projectId} />
{/* logout button */}
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </div>
  );
}

export default HomePage;

//actual code form before under jik




// import React, { useState} from 'react';// this is the logic that is run after the render and not during...wtv that means use chat to figure this out



// function HomePage({ onLogout, user }) {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const res = await fetch('/api', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ input }),
//     });
//     const data = await res.json();
//     setResponse(data.response);
//   };

//   return (
//     <div className="card">
//       <h2>Welcome, {user}!</h2>
//       <p>You are logged in successfully</p>
      
//       <form onSubmit={handleSubmit}>
//         <label>
//           Your Input Request to Server:
//           <input 
//             type="text" 
//             value={input} 
//             onChange={(e) => setInput(e.target.value)} 
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
      
//       <div>
//         Response from server: {response}
//       </div>
      
//       <button onClick={onLogout} className="logout-btn">Logout</button>
//     </div>
//   );
// }

// export default HomePage;
