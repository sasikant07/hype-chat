import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { messageClear, userLogin } from "../store/reducers/authReducer";

const initialValue = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, myInfo, authenticate } = useSelector(
    (state) => state.auth
  );
  const [state, setState] = useState(initialValue);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();

    const user = {
      email: state.email,
      password: state.password,
    };

    dispatch(userLogin(user));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }

    if (success) {
      toast.success(success);
      dispatch(messageClear());
    }

    if (error) {
      error.map((err) => toast.error(err));
      dispatch(messageClear());
    }
  }, [error, success]);

  return (
    <div className="login">
      <div className="card">
        <div className="card-header">
          <h3>Login</h3>
        </div>
        <div className="card-body">
          <form onSubmit={login}>
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
              <input type="submit" value="login" className="btn" />
            </div>
            <div className="form-group">
              <span>
                Not a user? <Link to="/messenger/register">Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
