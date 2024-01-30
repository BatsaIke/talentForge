const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require("cors");


const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token'); // Include x-auth-token
    
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
    
  next(); 
});

// Connect Database
connectDB(); 

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());


// Define Routes
app.use('/api/v1/users', require('./routes/api/users'));
app.use('/api/v1/auth', require('./routes/api/auth'));
app.use('/api/v1/profile', require('./routes/api/profile'));
app.use('/api/v1/posts', require('./routes/api/posts'));
app.use('/api/v1/company', require('./routes/api/companyRoute'));
app.use('/api/v1/company/job', require('./routes/api/jobPostRoute'));
app.use('/api/v1/student/job', require('./routes/api/AplyForJobRoute')); 




// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
