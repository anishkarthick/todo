const mongoose = require('mongoose');

//db
mongoose.connect("mongodb://598e8b80-0ee0-4-231-b9ee.mongo.cosmos.azure.com:10255/598e8b80-0ee0-4-231-b9ee?ssl=true&replicaSet=globaldb", {
  auth: {
    username: "598e8b80-0ee0-4-231-b9ee",
    password:"9BDvrPWjkAA7OMFOGS8ZF73GCYI5Mv8Nmabkx0UjSDhNmvNmTvrxvOdlECDLv8hcJCZL3vsnpqricOrmMWFURA=="
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false
})
  .then(() => console.log('Connection to CosmosDB successful'))
  .catch((err) => console.error(err));
