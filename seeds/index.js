const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/camp-vista', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://unsplash.com/photos/person-sitting-near-bonfire-surrounded-by-trees-1azAjl8FTnU',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit consectetur sapiente, suscipit consequuntur aut aperiam adipisci error ab earum alias, necessitatibus quos, architecto dignissimos magnam.',
            price: price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
