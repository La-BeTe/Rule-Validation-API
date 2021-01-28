const sendMyInfo = require("./controllers/home");
const validator = require("./controllers/validator");
const Response = require("./class_response");

function tryCatchWrap(cb) {
	return function (req, res, next) {
		try {
			const resp = cb(req.body);
			if (resp instanceof Response)
				res.status(resp.status).send(resp.toJSON());
			else
				throw new Error(
					"TryCatchWrap requires a function that returns a Response object"
				);
		} catch (e) {
			next(e);
		}
	};
}

module.exports = {
	sendMyInfo: tryCatchWrap(sendMyInfo),
	validator: tryCatchWrap(validator)
};
