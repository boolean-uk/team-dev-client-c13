// Function to validate email and return specific error messages

export const validateEmail = (email) => {
  if (!email) {
    return "Email is required.";
  }

  if (!email.includes("@")) {
    return "Email must contain '@'.";
  }

  if (!email.includes(".")) {
    return "Email must contain a '.'.";
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    return "Please enter a valid email address.";
  }

  return ""; // Return empty string if email is valid
};

// Function to validate password with conditions
export const validatePassword = (password) => {
  const specialChars = /^(?=.*[!@#$%^&*])/;
  const numbers = /^(?=.*[0-9])/;
  const forbiddenChars = /^(?=.*[(){}[\]|`¬¦"'<>:;|~_\-+=,])/;

  if (forbiddenChars.test(password)) {
    return "Password contains invalid characters!";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters long!";
  } else if (
    password.toLowerCase() === password ||
    password.toUpperCase() === password
  ) {
    return "Password must contain at least 1 uppercase and 1 lowercase letter.";
  } else if (!numbers.test(password)) {
    return "Password must contain at least 1 number.";
  } else if (!specialChars.test(password)) {
    return "Password must contain at least 1 special character.";
  } else {
    return "";
  }
};
