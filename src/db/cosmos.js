const mongoose = require('mongoose');

//db
mongoose.connect("mongodb://d6d9f436-0ee0-4-231-b9ee.mongo.cosmos.azure.com:10255/d6d9f436-0ee0-4-231-b9ee?ssl=true&replicaSet=globaldb", {
  auth: {
    username: "d6d9f436-0ee0-4-231-b9ee",
    password: "s5NpP63uXjKPXtm2OCWRurEjLGk95M87YWNrUjhWSnVQpE0CV0uuXas5ZYDrb00ZR8vsxkpDfrKjJNOGkEWPlw=="
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false
})
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.error(err));