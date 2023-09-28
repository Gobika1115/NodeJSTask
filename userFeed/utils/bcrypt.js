const bcrypt = require('bcrypt');

// Function to hash a password
exports.hashPassword = async (password) => {
  try {
    // Generate a salt with 10 rounds of salt generation
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Function to verify a password
exports.verifyPassword = async (password, hashedPassword) => {
  try {
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  } catch (error) {
    throw error;
  }
};
