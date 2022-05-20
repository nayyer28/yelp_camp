function catchAsync(func) {
	return function(req, res, next) {
		func(req, res, next).catch((e) => next(e)); // or, .catch(next(e))
	};
}

module.exports = catchAsync;
