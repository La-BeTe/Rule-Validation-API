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

describe("validator should throw an error", () => {
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
			const body = {
				...testBody,
				rule: {
					field: "missons",
					condition: "24",
					condition_value: 20
				}
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

describe("tests with examples provided", () => {
	test("example 1", () => {
		const body = {
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
		const expected = {
			message: "field missions successfully validated.",
			status: "success",
			data: {
				validation: {
					error: false,
					field: "missions",
					field_value: 45,
					condition: "gte",
					condition_value: 30
				}
			}
		};
		// Parse the JSON string so test does not fail due to
		// arrangement of object properties by javascript
		expect(JSON.parse(validate(body).toJSON())).toEqual(
			JSON.parse(JSON.stringify(expected))
		);
	});
	test("example 2", () => {
		const body = {
			rule: {
				field: "0",
				condition: "eq",
				condition_value: "a"
			},
			data: "damien-marley"
		};
		const expected = {
			message: "field 0 failed validation.",
			status: "error",
			data: {
				validation: {
					error: true,
					field: "0",
					field_value: "d",
					condition: "eq",
					condition_value: "a"
				}
			}
		};
		// Parse the JSON string so test does not fail due to
		// arrangement of object properties by javascript
		expect(JSON.parse(validate(body).toJSON())).toEqual(
			JSON.parse(JSON.stringify(expected))
		);
	});
	test("example 3", () => {
		const body = {
			rule: {
				field: "5",
				condition: "contains",
				condition_value: "rocinante"
			},
			data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
		};
		const expected = {
			message: "field 5 is missing from data.",
			status: "error",
			data: null
        };
        try{
            validate(body);
        }catch(e){
            // Parse the JSON string so test does not fail due to
            // arrangement of object properties by javascript
            expect(JSON.parse(e.toJSON())).toEqual(
                JSON.parse(JSON.stringify(expected))
            );
        }
	});
});
