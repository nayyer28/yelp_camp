const { date } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const CampgroundSchema = new Schema({
	title: String,
	price: Number,
	location: String,
	description: String,
	image: String,
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review'
		}
	]
});

CampgroundSchema.post('findOneAndDelete', async function(doc) {
	if (doc) {
		await Review.remove({
			_id: {
				$in: doc.reviews
			}
		});
	}
});

module.exports = mongoose.model('Campground', CampgroundSchema);
