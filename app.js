const express = require("express");
const { sendMyInfo, validateRule } = require("./controller");
const Response = require("./class_response");
require("dotenv").config();

const app = express();

app.get("/", sendMyInfo);

app.post("/validate-rule", validateRule);

// 404 handler
app.use((req, _, next) => {
	next(new Response(`Route /${req.url} is not available`, 404));
});

// Internal server error handler
app.use((err, _, res, __) => {
	console.log(err.message);
	const resp =
		err instanceof Response
			? err
			: new Response("Internal server error occurred", 500);
	res.status(resp.status).send(resp.toJSON());
});

app.listen(process.env.PORT, () =>
	console.log(`Server listening on port ${process.env.PORT}`)
);
