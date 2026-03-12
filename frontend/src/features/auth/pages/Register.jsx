import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/userAuthHooks";
import { useState } from "react";
const Register = () => {
 
  const {loading,handleRegister}=useAuth()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("submit");
    await handleRegister({email,password,username})
    navigate("/")

  };

  if(loading){
    return (<main><h1>Loading....</h1></main>)
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e, target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
