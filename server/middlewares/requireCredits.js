module.exports = (req, res, next) => {
	//next is fcn to call when middleware is complete. like done in passport
	if (req.user.credits < 1) {
		return res.status(403).send({ error: 'Insufficient credits!' });
	}
	//if user is logged in, continue to next middleware
	next();
};
