const mongoose = require('mongoose');

// Connect to the database
mongoose.connect(
"mongodb://6dc843c8-0ee0-4-231-b9ee:p33g2zNIz8UA8Cl4cclbkCbDPN5abRUbuTdfpZmGnae0Xu99baMVGg00tUaJxtn8rNqWK4wzKqHgqkJMI4aPeA==@6dc843c8-0ee0-4-231-b9ee.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@6dc843c8-0ee0-4-231-b9ee@",  
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  }
);



// const mongoose = require('mongoose');

// //db
// mongoose.connect("mongodb://470faba6-0ee0-4-231-b9ee.mongo.cosmos.azure.com:10255/470faba6-0ee0-4-231-b9ee?ssl=true&replicaSet=globaldb", {
//   auth: {
//     username: "470faba6-0ee0-4-231-b9ee",
//     password:"huVy9YbQkgfl56nXUOydZiUoNC7sfn6ePtQ9AHwrZcw1QIkiU6rMQHzxObvmH5odFMxduTbBm1tGfdyaWiM89g=="
//   },
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   retryWrites: false
// })
//   .then(() => console.log('Connection to CosmosDB successful'))
//   .catch((err) => console.error(err));
