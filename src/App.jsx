import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Home from './Home';
import Jobs from './Jobs';
import Companies from './Companies';
import NavBar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import CompanyDetail from './CompanyDetail';
import JobDetail from './JobDetails';
import Profile from './Profile'
import JobCard from './JobCard';
import { jwtDecode } from 'jwt-decode';

function decodeToken(token) {
  return jwtDecode(token);
}

function PrivateRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001';

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      const response = await axios({ url, method, data, params, headers });
      return response.data;
    } catch (err) {
      let message = err.response?.data?.error?.message || 'Unknown error';
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(params = {}) {
    const res = await this.request('companies', params);
    return res.companies;
  }

  static async getJobs() {
    const res = await this.request('jobs');
    return res.jobs;
  }

  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async login(data) {
    return await this.request('auth/token', data, 'post');
  }

  static async signup(data) {
    return await this.request('auth/register', data, 'post');
  }

  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  static async applyToJob(id) {
    const res = await this.request(`jobs/${id}/apply`, {}, "post");
    return res;
  }  
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  function updateUser(userData) {
    setCurrentUser(userData);
  }

  useEffect(() => {
    JoblyApi.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          JoblyApi.token = token;
          const { username } = decodeToken(token);
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user);
        } catch (err) {
          console.error("Error loading user:", err);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
  
    fetchUser();
  }, [token]);
  

  async function login(formData) {
    try {
      const { token } = await JoblyApi.login(formData);
      setToken(token);
    } catch (err) {
      console.error('Login failed', err);
    }
  }

  async function signup(formData) {
    try {
      const { token } = await JoblyApi.signup(formData);
      setToken(token);
    } catch (err) {
      console.error('Signup failed', err);
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  if (!infoLoaded) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <NavBar logout={logout} currentUser={currentUser} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<PrivateRoute currentUser={currentUser}><Companies /></PrivateRoute>} />
          <Route path="/companies/:id" element={<PrivateRoute currentUser={currentUser}><CompanyDetail /></PrivateRoute>} />
          <Route path="/jobs" element={<PrivateRoute currentUser={currentUser}><Jobs currentUser={currentUser}/></PrivateRoute>} />
          <Route path="/jobs/:id" element={<PrivateRoute currentUser={currentUser}><JobDetail /></PrivateRoute>} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />
          <Route path="/profile" element={<PrivateRoute currentUser={currentUser}><Profile currentUser={currentUser} updateUser={updateUser} />
    </PrivateRoute>
  }
/>

        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
export { JoblyApi };
