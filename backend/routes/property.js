const express = require('express');
const router = express.Router();
const multer = require('multer');
const Property = require('../models/property');



// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  
  // // Add Property with Image
  // router.post('/add', upload.single('image'), async (req, res) => {
  //   try {
  //     const propertyData = JSON.parse(req.body.property);
  //     const imageUrl = `/uploads/${req.file.filename}`;
  //     const property = new Property({ ...propertyData, imageUrl });
  //     await property.save();
  //     res.status(201).json({ message: 'Property added successfully' });
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // });

// Create a new property
router.post('/', async (req, res) => {
    const newProperty = new Property(req.body);
    try {
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// // // Get all properties
// router.get('/', async (req, res) => {
//     try {
//         const properties = await Property.find();
//         res.status(200).json(properties);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// Get a property by ID
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        res.status(200).json(property);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a property by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProperty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a property by ID
router.delete('/:id', async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Property deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
      const {city, location, propertyType, rent } = req.query;
      const query = {};
      if(city)query.city = new RegExp(city,'i');
      if (location) query.location = new RegExp(location, 'i');
      if (propertyType) query.propertyType = propertyType;
      if (rent) query.rent = { $lte: rent };
  
      const properties = await Property.find(query);
      res.json(properties);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


  module.exports = router;
