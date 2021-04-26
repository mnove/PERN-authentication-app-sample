// DB_ variables should be put inside a .env file in the project's root folder
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_database = process.env.DB_DATABASE;

// JWT secret variable
// You should generate your unique secret for the JWT
// Go here https://www.grc.com/passwords.htm to generate a random string and paste it in the .env file as JWT_SECRET = <YOUR SECRET STRING>

const secretKey = process.env.JWT_SECRET;

module.exports = {
  // Local PostgreSQL Keys
  postgresDb: {
    user: db_user,
    password: db_password,
    host: db_host,
    port: db_port,
    database: db_database,
  },

  // JWT secret key (for authentication)
  jwt: {
    secret: `${secretKey}`,
  },
};


