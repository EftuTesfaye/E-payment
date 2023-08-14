module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'eftu@0234',
    DB: 'epayments',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };