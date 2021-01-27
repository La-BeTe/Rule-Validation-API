const Response = require("../class_response");

module.exports = function () {
	const message = "My Rule-Validation API";
	const status = 200;
	const data = {
		name: process.env.NAME,
		github: process.env.GITHUB,
		email: process.env.EMAIL,
		mobile: process.env.MOBILE
	};
	return new Response(message, status, data);
};
