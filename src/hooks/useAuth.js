import { useState } from 'react'
import { baseUrl } from '../basurl';
import { useNavigate } from 'react-router-dom';

const useAuth = ( loginData ) => {
  // create a loading state for our API calls
  const [loading, setLoading] = useState(false);
  // create a naviagtion from react-router-dom to redirect the user when login is successful
  const navigate = useNavigate();

  // create a function that will call the login endpoint of the API
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: loginData?.username,
          password: loginData?.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        navigate("/home/dashboard", {
          state: data,
          replace: true,
        });
      } else {
        alert(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // create a function that will submit the login form
  const onSubmit = (e) => {
    e.preventDefault();

    handleLogin();
  };

  return {
    onSubmit,
    loading,
  };
}

export default useAuth