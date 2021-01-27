const sendMyInfo = require("./controllers/home");
const validateRule = require("./controllers/validator");
const Response = require("./class_response");

function tryCatchWrap(cb) {
	return function (_, res, next) {
		try {
			const resp = cb();
			if (resp instanceof Response) res.send(resp.toJSON());
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
	validateRule: tryCatchWrap(validateRule)
};
