dbPassword =
  "mongodb+srv://Ryan:" +
  encodeURIComponent(process.env.MONGODBPASSWORD) +
  "@cluster0.c9xsk.mongodb.net/test?retryWrites=true";

module.exports = {
  mongoURI: dbPassword,
};
