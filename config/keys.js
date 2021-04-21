// DB_ variables should be put inside a .env file in the project's root folder
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_url = process.env.DB_URL;

// JWT secret variable
// You should generate your unique secret for the JWT
// Go here https://www.grc.com/passwords.htm to generate a random string and paste it in the .env file as JWT_SECRET = <YOUR SECRET STRING>

const secretKey = process.env.JWT_SECRET;

module.exports = {
  // MongoDB Atlas Database
  mongdodb: {
    dbURI: `mongodb+srv://${db_user}:${db_password}@${db_url}`,
  },

  // JWT secret key (for authentication)
  jwt: {
    secret: `${secretKey}`,
  },
};
