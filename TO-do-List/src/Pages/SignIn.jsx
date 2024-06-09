import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import { toast } from "react-hot-toast";
import axios from "axios";


// eslint-disable-next-line react/prop-types
const SignIn = ({ setIsLoggedin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleForm(event) {
    const { name, value } = event.target;
    setFormData((prevdata) => {
      return {
        ...prevdata,
        [name]: value,
      };
    });
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   setIsLoggedin(true);
  //   toast.success("Signed");
  //   navigate("/");
  // }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/user/Signin", formData,{ withCredentials: true })
      .then((response) => {
        if (response.data.success === true) {
          const token = getCookie('token');
          console.log(token);
          setIsLoggedin(true);
          // onLogin(response.data.user); // Pass user data to the parent component
          toast.success("Signed");
          navigate("/");
        } else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="SignIn">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h3 className="SignIn-name">Sign In</h3>
        <div className="lineup"></div>
        <div className="flex flex-col">
          <label>
            <p className="text-left m-1 ml-0">Email</p>
            <input
              type="email"
              required
              onChange={handleForm}
              placeholder="    Email Your Email"
              value={formData.email}
              name="email"
            />
          </label>

          <label>
            <p className="text-left m-1 ml-0">Password</p>
            <input
              type="password"
              required
              onChange={handleForm}
              placeholder="    Enter the Password"
              value={formData.password}
              name="password"
            />
          </label>

          <button className="signInBtn">Sign In</button>
          <p className="text-right text-blue-600 ">
            <Link to="/forgot-password">Forgotten Password?</Link>
          </p>
        </div>
        <div>
          <div className="line"></div>
          <p className="text-center">
            Do not have an account?
            <Link to="/signup">
              <span className="text-blue-600"> Signup</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
