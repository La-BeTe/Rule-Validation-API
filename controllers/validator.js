const Response = require("../class_response");

function hasProp(object, prop) {
	if (typeof prop !== "string")
		throw new Error(
			`hasProp requires a string as second argument, got ${prop}`
		);
	if (typeof object === "string") return object[prop];
	if (typeof object !== "object")
		throw new Error(
			`hasProp requires a object as first argument, got ${object}`
		);
	return object.hasOwnProperty(prop);
}

function checkRule(rule) {
	const allowedConditions = ["eq", "neq", "gt", "gte", "contains"];
	const allowedFields = ["field", "condition", "condition_value"];
	if (!rule) return "rule is required";
	if (typeof rule !== "object") return "rule should be an object";
	for (let field of allowedFields) {
		if (!hasProp(rule, field)) return `rule.${field} is required`;
	}
	if (!allowedConditions.includes(rule.condition))
		return `rule.condition should be one of ${allowedConditions.join(
			", "
		)}`;
	return "";
}

function checkData(data) {
	if (!data) return "data is required";
	switch (typeof data) {
		case "object":
		case "string":
			break;
		default:
			return "data should be an object, array or string";
	}
	return "";
}

function checkRuleAndData({ rule, data }) {
	const ruleSyntaxIncorrect = checkRule(rule);
	const dataSyntaxIncorrect = checkData(data);
	if (ruleSyntaxIncorrect) return ruleSyntaxIncorrect;
	if (dataSyntaxIncorrect) return dataSyntaxIncorrect;
	return "";
}

function validate(field_value, condition_value, condition) {
	switch (condition) {
		case "eq":
			return field_value === condition_value;
		case "neq":
			return field_value !== condition_value;
		case "gt":
			return field_value > condition_value;
		case "gte":
			return field_value >= condition_value;
		case "contains":
			return field_value.includes(condition_value);
	}
}

module.exports = function (body) {
	if (!hasProp(body, "rule") && !hasProp(body, "data"))
		throw new Response("rule and data are required", 400);
	const isSyntaxIncorrect = checkRuleAndData(body);
	if (isSyntaxIncorrect) throw new Response(isSyntaxIncorrect, 400);

	const {
		rule: { condition, condition_value, field },
		data
	} = body;
	if (!hasProp(data, field))
		throw new Response(`field ${field} is missing from data`, 400);
	const error = !validate(data[field], condition_value, condition);
	const message = error
		? `field ${field} failed validation`
		: `field ${field} successfully validated`;
	const status = error ? 400 : 200;
	const returnData = {
		validation: {
			error,
			field_value: data[field],
			field,
			condition,
			condition_value
		}
	};

	return new Response(message, status, returnData);
};
