import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Authentication() {
  const [inEmail, setInEmail] = useState("");
  const [inPassword, setInPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:2066/accounts/login", {
        email: inEmail,
        password: inPassword,
      })

      const { success, result } = response.data;

      if (success) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result))
        navigate("/dashboard")
      } else {
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="login">
        <h2>Welcome</h2>
        <input
          type="text"
          placeholder="email"
          value={inEmail}
          onChange={(e) => setInEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          value={inPassword}
          onChange={(e) => setInPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}

export default Authentication;


// import './pages.css'
// import axios from 'axios';
// import { useState } from 'react';


// function Authentication() {
//     const [inEmail, setInEmail] = useState('');
//     const [inPassword, setInPassword] = useState('');

//     const handleLogin = async () => {
//         try {
//             const res = await axios.post('http://localhost:2066/login', {
//                 email: inEmail,
//                 password: inPassword
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div>
//             <div className="login">
//                 <h2>Welcome</h2>
//                 <input type="text" placeholder="email" value={inEmail} onChange={(e) => setInEmail(e.target.value)} /><br />
//                 <input type="password" placeholder="password" value={inPassword} onChange={(e) => setInPassword(e.target.value)} /><br />
//                 <button onClick={handleLogin}>Log In</button>
//             </div>
//         </div>
//     )
// }

// export default Authentication