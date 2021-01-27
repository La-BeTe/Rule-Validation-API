const validate = require("./validator");
const Response = require("../class_response");

const testBody = {
	rule: {
		field: "missions",
		condition: "gte",
		condition_value: 30
	},
	data: {
		name: "James Holden",
		crew: "Rocinante",
		age: 34,
		position: "Captain",
		missions: 45
	}
};

describe("validateRule should throw an error", () => {
	test("if rule and data fields are missing", () => {
		const body = {};
		expect(() => validate(body)).toThrow(
			new Response("rule and data are required", 400, null)
		);
	});
	describe("if rule field", () => {
		test("is missing", () => {
			const body = {
				data: testBody.data
			};
			expect(() => validate(body)).toThrow(
				new Response("rule is required", 400, null)
			);
		});
		test("is of wrong type or does not contain a required field", () => {
			const body = { ...testBody, rule: 1 };
			expect(() => validate(body)).toThrow(
				new Response("rule should be an object", 400, null)
			);
			body.rule = { field: "missons", condition: "gte" };
			expect(() => validate(body)).toThrow(
				new Response("rule.condition_value is required", 400, null)
			);
		});
		test("has an unallowed condition field", () => {
			body.rule = {
				field: "missons",
				condition: "24",
				condition_value: 20
			};
			expect(() => validate(body)).toThrow(
				new Response(
					"rule.condition should be one of eq, neq, gt, gte, contains",
					400,
					null
				)
			);
		});
	});
	describe("if data field", () => {
		test("is missing", () => {
			const body = {
				rule: testBody.rule
			};
			expect(() => validate(body)).toThrow(
				new Response("data is required", 400, null)
			);
		});
		test("is of wrong type", () => {
			const body = { ...testBody, data: 1 };
			expect(() => validate(body)).toThrow(
				new Response(
					"data should be an object, array or string",
					400,
					null
				)
			);
		});
		test("does not contain the field specified in rule", () => {
			const body = { ...testBody, data: { randomProp: "randomString" } };
			expect(() => validate(body)).toThrow(
				new Response("field missions is missing from data", 400, null)
			);
		});
	});
});

describe("should return response after validating data", () => {
	test("success response", () => {
		expect(validate(testBody)).toEqual(
			new Response("field missions successfully validated.", 200, {
				validation: {
					error: false,
					field: "missions",
					field_value: 30,
					condition: "gte",
					condition_value: 30
				}
			})
		);
	});
	test("failed response", () => {
		testBody.data.missions = 54;
		expect(validate(testBody)).toEqual(
			new Response("field missions failed validation.", 400, {
				validation: {
					error: true,
					field: "missions",
					field_value: 30,
					condition: "gte",
					condition_value: 54
				}
			})
		);
		testBody.data.missions = 30;
	});
});
