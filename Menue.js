// Import necessary packages
const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const host = 'localhost'

// Initialize Express app
const app = express();
const port = 3000;

// Use middleware to parse JSON data
app.use(cors());
app.use(bodyParser.json());

// Sample data (initial menu items, feedback, private dining, catering, delivery)
let menuItems = [
    {
        id: 1,
        name: 'Chicken Alfredo',
        description: 'Creamy Alfredo sauce with grilled chicken',
        ingredients: ['Chicken', 'Pasta', 'Alfredo Sauce'],
        price: 12.99,
        category: 'main course'
    },
    // Add more menu items as needed
];

let feedbacks = []; // Array to store feedback
let privateDining = {}; // Object to store private dining reservations
let catering = {}; // Object to store catering service details
let deliveryOptions = {}; // Object to store delivery options

// Endpoint to get all menu items
app.get('/menu-items', (req, res) => {
    res.json(menuItems);
});

// Endpoint to add a new menu item
app.post('/menu-items', (req, res) => {
    const newItem = req.body;
    newItem.id = menuItems.length + 1; // Generate a new ID
    menuItems.push(newItem);
    res.json(newItem);
});

// Endpoint to get menu items by category
app.get('/menu-items/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filteredItems = menuItems.filter(item => item.category.toLowerCase() === category);
    res.json(filteredItems);
});


// Endpoint to update a menu item by ID
app.put('/menu-items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;

    menuItems = menuItems.map(item => {
        if (item.id === itemId) {
            return { ...item, ...updatedItem };
        }
        return item;
    });

    res.json(menuItems.find(item => item.id === itemId));
});

// Endpoint to delete a menu item by ID
app.delete('/menu-items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    menuItems = menuItems.filter(item => item.id !== itemId);
    res.json({ message: 'Menu item deleted successfully' });
});

// Endpoint to submit feedback
app.post('/feedback', (req, res) => {
    const newFeedback = req.body;
    feedbacks.push(newFeedback);
    res.json({ message: 'Feedback submitted successfully' });
});

// Endpoint to make a private dining reservation
app.post('/private-dining', (req, res) => {
    const reservationDetails = req.body;
    // Logic to handle private dining reservations
    privateDining = reservationDetails;
    res.json({ message: 'Private dining reservation confirmed' });
});

// Endpoint to get catering service details
app.get('/catering', (req, res) => {
    res.json(catering);
});

// Endpoint to update catering service details
app.put('/catering', (req, res) => {
    const updatedCateringDetails = req.body;
    catering = updatedCateringDetails;
    res.json({ message: 'Catering service details updated successfully' });
});

// Endpoint to get delivery options
app.get('/delivery', (req, res) => {
    res.json(deliveryOptions);
});

// Endpoint to update delivery options
app.put('/delivery', (req, res) => {
    const updatedDeliveryOptions = req.body;
    deliveryOptions = updatedDeliveryOptions;
    res.json({ message: 'Delivery options updated successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
