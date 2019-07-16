module.exports = (req, res, next) => {
	//next is fcn to call when middleware is complete. like done in passport
	if (!req.user) {
		return res.status(401).send({ error: 'You must be logged in!' });
	}
	//if user is logged in, continue to next middleware
	next();
};
