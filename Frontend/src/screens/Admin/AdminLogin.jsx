import React, { useState,useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAdminLoginMutation } from "../../slices/adminApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/adminAuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth)

  useEffect(() => {
    if (adminInfo) {
      navigate('/admin/get-user');
    }
  }, [adminInfo, navigate]);
  const handleLogin = async(e) => {
    console.log(adminInfo)
    e.preventDefault();
    try {
      const responceFromApiCall = await login({ email, password }).unwrap();
      console.log("responceFromApiCall",responceFromApiCall);
      dispatch(setCredentials({ ...responceFromApiCall }));
      navigate("/admin/get-user");
    } catch (error) {
      toast.error("An error ocooured,try again ");
    }
  };

  return (
    <div className="container  mt-4 border" >
      <div className="d-flex justify-content-center align-items-center">
        <div className="text-center rounded p-4 col-md-6">
          <h2>Admin Login</h2>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;