import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/reducers/authReducer";

const initialValue = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialValue);
  const [loadImage, setLoadImage] = useState("");

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", state.userName);
    formData.append("email", state.email);
    formData.append("password", state.password);
    formData.append("confirmPassword", state.confirmPassword);
    formData.append("image", state.image);

    dispatch(userRegister(formData));
  };

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                onChange={inputHandle}
                value={state.userName}
                name="userName"
                type="text"
                className="form-control"
                placeholder="Username"
                id="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onChange={inputHandle}
                value={state.confirmPassword}
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                id="confirmPassword"
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="user" /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">Select Image</label>
                  <input
                    onChange={fileHandle}
                    name="image"
                    type="file"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="register" className="btn" />
            </div>
            <div className="form-group">
              <span>
                Already a user? <Link to="/messenger/login">Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
