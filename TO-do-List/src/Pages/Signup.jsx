/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleForm(event) {
    const { name, value } = event.target;
    setUserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    axios
      .post("http://localhost:4000/user/Signup",
        userdata)
      .then((response) => {
        if (response.data.success == true) {
          console.log(response.data.message);
          toast.success(response.data.message);
          navigate("/Signin");
        } else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   if (userdata.password !== userdata.confirmPassword) {
  //     toast.error("password not match");
  //     return;
  //   } else {
  //     const dataall = userdata;
  //     console.log(dataall);
  //     toast.success("Signup Successfully");
  //     navigate("/signin");
  //   }
  // }

  return (
    <div className="signup-card">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h3 className="Signup-name">SignUp</h3>
        <div className="line"></div>

        <div className="flex flex-row">
          <label>
            <p className="text-left ml-1 mt-3">First Name</p>
            <input
              value={userdata.firstname}
              onChange={handleForm}
              required
              type="text"
              placeholder="firstname"
              name="firstname"
            />
          </label>

          <label>
            <p className="text-left ml-1 mt-3">Last Name</p>
            <input
              value={userdata.lastname}
              onChange={handleForm}
              required
              type="text"
              placeholder="lastname"
              name="lastname"
            />
          </label>
        </div>

        <label>
          <p className="text-left ml-1 mt-3">Username</p>
          <input
            value={userdata.username}
            onChange={handleForm}
            required
            type="text"
            placeholder="Username"
            name="username"
          />
        </label>

        <label>
          <p className="text-left ml-1 mt-3">Email</p>
          <input
            value={userdata.email}
            onChange={handleForm}
            required
            type="email"
            placeholder="Email"
            name="email"
          />
        </label>

        <div className="flex flex-row">
          <label>
            <p className="text-left ml-1 mt-3">Password</p>
            <input
              value={userdata.password}
              onChange={handleForm}
              required
              type="password"
              placeholder="password"
              name="password"
            />
          </label>

          <label>
            <p className="text-left ml-1 mt-3">Confirm Password</p>
            <input
              value={userdata.confirmPassword}
              onChange={handleForm}
              required
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </label>
        </div>

        <button>Sign up</button>

        <div className="border-2 border-solid "></div>

        <p className="text-right mr-10 mt-3">
          Already have an Account?{" "}
          <Link to="/signin">
            <span className="text-blue-600">Sign in</span>
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Signup;
