const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const axios = require('axios');
mongoose.connect('mongodb://localhost:27017/yelp-camp');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('database connected!'));

const sample = (array) => array[Math.floor(Math.random() * array.length)];
async function fetchImage() {
	const url =
		'https://api.unsplash.com/photos/random?collection=483251&client_id=7AKBgVr66lnRAMLLqMLuCSEmMBUD2jzss5RKVCRJ7o0';
	const response = await axios({
		url,
		method: 'GET',
		responseType: 'JSON'
	})
		.then((res) => res.data.urls.small)
		.catch((err) => console.log(err));

	return response;
}
const seedDB = async () => {
	await Campground.deleteMany({});
	const c = new Campground({ title: 'purple fields' });
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const img = await fetchImage();
		const camp = new Campground({
			title: `${sample(descriptors)} ${sample(places)}`,
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			image: img,
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum ad aliquam corporis eius officia reprehenderit magnam eligendi, cum animi dolorem adipisci unde, vel enim accusantium itaque aut! Maiores, delectus autem.',
			price: Math.floor(Math.random() * 20 + 10)
		});
		await camp.save();
	}
};

seedDB().then(() => {
	db.close();
});
