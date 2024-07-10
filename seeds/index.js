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
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // User Id
            author: '66884ce8f40a259a9541910a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry:{
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dgkyk4pn3/image/upload/v1720460162/campVista/vdnh3yrvi77r6ea0bdwj.jpg',
                  filename: 'campVista/vdnh3yrvi77r6ea0bdwj',
                },
                {
                    url: 'https://res.cloudinary.com/dgkyk4pn3/image/upload/v1720461260/campVista/dmvvopexfh7drhas06wt.jpg',
                    filename: 'campVista/dmvvopexfh7drhas06wt',
                  }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit consectetur sapiente, suscipit consequuntur aut aperiam adipisci error ab earum alias, necessitatibus quos, architecto dignissimos magnam.',
            price: price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
