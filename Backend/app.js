// const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session");
// const mongoStore = MongoDBStore(session);
const express = require('express')
const database = require('./database').connectDB;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

database();

// const store = new mongoStore({
//   collection: "userSessions",
//   uri: process.env.DB_URL,
//   expires: 1000,
// });


const userRoute = require('./routes/userRoute')
const bookRoute = require('./routes/bookRoute')

const corsOptions = {
    origin: 'http://localhost:4200', // Replace with the URL of your Angular app
    credentials: true, // Allow credentials (cookies) to be sent by the browser
  }
// app.use(
//     session({
//       name: "USER_SESSION",
//       secret: "SESS_SECRET",
//       store: store,
//       saveUninitialized: false,
//       resave: false,
//       cookie: {
//         sameSite: false,
//         secure: process.env.NODE_ENV === "production",
//         maxAge: 2*60*60*1000, //expires in 2 hours
//         httpOnly: true,
//       }
//     })
// );

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use('/api',userRoute)
app.use('/api/books',bookRoute) 

app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});