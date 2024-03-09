document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if username already exists
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Store user credentials
    localStorage.setItem(username, JSON.stringify({ username, password }));
    alert("Signup successful! Redirecting to login page.");
    window.location.href = "login.html"; // Redirect to login page
  });
