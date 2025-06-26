Configured the application to use MongoDB Atlas, a cloud-hosted MongoDB database, instead of a local MongoDB instance.

✅ What I have Done
Set up a MongoDB Atlas cluster at https://cloud.mongodb.com

Created a database user with secure credentials

Whitelisted all IP addresses for testing purposes

Retrieved the connection URI for MongoDB Atlas; 

Updated the _config.js file to include the new mongoURI for: mongodb+srv://omwoyo:Nairobi@2025!!@omwoyo.bjgaa4t.mongodb.net/?retryWrites=true&w=majority&appName=Omwoyo


Config file

🔐 Sample Config (from _config.js)
js
Copy
Edit
var config = {}

config.mongoURI = {
  production: 'mongodb+srv://omwoyo:Nairobi2025@omwoyo.bjgaa4t.mongodb.net/?retryWrites=true&w=majority&appName=Omwoyo',
  development: 'mongodb+srv://omwoyo:Nairobi2025@omwoyo.bjgaa4t.mongodb.net/?retryWrites=true&w=majority&appName=Omwoyo',
  test: 'mongodb+srv://omwoyo:Nairobi2025@omwoyo.bjgaa4t.mongodb.net/?retryWrites=true&w=majority&appName=Omwoyo',
}

module.exports = config;
