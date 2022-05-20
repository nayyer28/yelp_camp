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

module.exports.campgroundSchema = campgroundSchema;
