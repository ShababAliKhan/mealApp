document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Retrieve user credentials from localStorage
    const userData = JSON.parse(localStorage.getItem(username));
    if (!userData) {
      alert("User not found. Please signup first.");
      return;
    }

    // Check if password matches
    if (userData.password !== password) {
      alert("Invalid password. Please try again.");
      return;
    }

    // Authentication successful, set flag in localStorage
    localStorage.setItem("authenticated", true);
    // After successful authentication
    // const username = "Username"; // Replace this with the actual username
    localStorage.setItem("username", username);

    alert("Login successful! Redirecting to main page.");
    window.location.href = "index.html"; // Redirect to main page
  });
