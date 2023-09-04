import React, { useState, useEffect } from 'react';
import './RegistrationPage.css'; // Import the CSS file

function RegistrationPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isUsernameTaken, setIsUsernameTaken] = useState(false); // State to track username availability

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsUsernameTaken(false);
  };
  
  const checkUsernameAvailability = async () => {
    const response = await fetch('http://localhost:3000/api/check-username', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: formData.username }),
    });

    if (response.status === 200) {
      setIsUsernameTaken(false); // Username is available
    } else if (response.status === 400) {
      setIsUsernameTaken(true); // Username is already taken
    }
  };

  useEffect(() => {
    if (formData.username) {
      checkUsernameAvailability();
    }
  }, [formData.username]);

  const validatePassword = (password) => {
    if (password.length > 24) {
      return 'Password must be 24 characters or less.';
    } else if (password.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    return '';
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const error = validatePassword(password);
    setErrorMessage(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Create a registration object with the username and password from the form data
    const registrationData = {
      username: formData.username,
      password: formData.password,
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData), // Send the registration data as JSON
      });
  
      if (response.status === 200) {
        // Registration was successful, you can redirect the user or show a success message
        alert('Registration successful! In the data base!');
        // Optionally, clear the form fields after successful registration
        setFormData({
          username: '',
          password: '',
        });
        setErrorMessage('');
      } else {
        // Handle registration failure, possibly by displaying an error message

        alert('Registration failed. Please try again. frontend');

      }
    } catch (error) {
      // Handle any network or server errors
      console.error('Registration error:', error);
      alert('Registration failed. Please try again later idiot.');
    }
  };
  
  

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} method='POST'>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handlePasswordChange}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Use a CSS class for styling */}
        <button type="submit" disabled={isUsernameTaken || !!errorMessage}>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;
