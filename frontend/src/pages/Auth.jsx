import { useState } from "react";
import axiosInstance from "../api/axios";
const auth = () => {
  const [su, setsu] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axiosInstance.post('/auth', {
        name:name,
        email:email,
        password:password
      });
      console.log('signup successful:', response.data);
      handleLogin();
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        name:name,
        email:email,
        password:password
      });
      const token = response.data.token;

      // ✅ Save token in localStorage
      localStorage.setItem('token', token);

      console.log('Login successful:', response.data);
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
    }
  };


  if (su) {
    return (
      
      <div data-theme="forest" className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-sm shadow-xl bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>

            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input type="text" value={ name } onChange={(e) => setName(e.target.value)} placeholder="Name" className="input input-bordered w-full" />
            </label>

            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input type="email" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full" />
            </label>

            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" value={ password } onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" />
            </label>

            <button onClick={ handleSignup } className="btn btn-primary w-full">Sign Up</button>
            <p className="justify-self-start" onClick={() => { setsu(false) }}>Already an account?</p>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div data-theme="forest" className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-full max-w-sm shadow-xl bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center">Log In</h2>

            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input type="email" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-full" />
            </label>

            <label className="form-control w-full mb-6">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="password" value={ password } onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input input-bordered w-full" />
            </label>

            <button onClick={ handleLogin } className="btn btn-accent w-full">Log In</button>
            <p onClick={() => { setsu(true) }} className="justify-self-start">Don't have an account?</p>
          </div>
        </div>
      </div>
    )
  }
};

export default auth;
