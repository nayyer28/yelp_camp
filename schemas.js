const joi = require('joi');

const campgroundSchema = joi.object({
	campground: joi
		.object({
			title: joi.string().required(),
			price: joi.number().min(0).required(),
			location: joi.string().required(),
			description: joi.string().required(),
			image: joi.string().required()
		})
		.required()
});

const reviewSchema = joi.object({
	review: joi
		.object({
			reviewBody: joi.string().required().min(10),
			rating: joi.number().min(1).max(5)
		})
		.required()
});

module.exports.campgroundSchema = campgroundSchema;
module.exports.reviewSchema = reviewSchema;
