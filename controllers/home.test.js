const sendMyInfo = require("./home");

test("sendMyInfo will return an object containing my details", () => {
	const expectedData = JSON.stringify({
		message: "My Rule-Validation API",
		status: "success",
		data: {
			name: "XXX XXX",
			github: "@XX-XXX",
			email: "xxx@gmail.com",
			mobile: "+234 XXX XXXX"
		}
	});
	const data = sendMyInfo();
	expect(data.toJSON()).toEqual(expectedData);
});
