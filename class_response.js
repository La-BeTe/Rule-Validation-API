class Response {
	constructor(message, status, data = null) {
		if (typeof message === "string") {
			this.message = message.endsWith(".") ? message : message + ".";
		} else {
			throw new Error(
				`Class Response requires a string message, got ${message}`
			);
		}
		if (typeof status === "number") {
			this.status = status;
		} else {
			throw new Error(
				`Class Response requires a status code, got ${status}`
			);
		}
		this.data = data;
	}
	toJSON() {
		const clone = { ...this };
		clone.status = clone.status >= 400 ? "error" : "success";
		return JSON.stringify(clone);
	}
}

module.exports = Response;
