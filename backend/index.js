const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/property', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
const propertyRoutes = require('./routes/property');
const userRoutes = require('./routes/user');
app.use('/api/properties', propertyRoutes);
app.use('/api/users',userRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Mock data
// const cities = [
//   { id: 1, name: 'Hyderabad' },
//   { id: 2, name: 'Kamareddy' },
//   { id: 3, name: 'Chennai' }
// ];

// const locations = {
//   1: ['Kondapur', 'Hitech-city', 'Madhapur'],
//   2: ['Osmanpura', 'Ashoknagar', 'vidyanagar'],
//   3: ['Saidapet', 'Basin Bridge', 'Ayanavaram']
// };

// Endpoints
app.get('/cities', (req, res) => {
  res.json(cities);
});

app.get('/locations/:cityId', (req, res) => {
  const cityId = req.params.cityId;
  res.json(locations[cityId] || []);
});
