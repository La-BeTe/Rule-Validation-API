const { sendMyInfo } = require("../controller");

test("sendHomeInfo", () => {
	const expectedData = {
		message: "My Rule-Validation API",
		status: "success",
		data: {
			name: "Emejuru Emmanuel",
			github: "@La-BeTe",
			email: "emmanuelemejuru15@gmail.com",
			mobile: "09017858524"
		}
	};
	const data = sendMyInfo();
	expect(data).toEqual(expectedData);
});
