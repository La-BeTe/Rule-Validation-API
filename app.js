const express = require("express");
const { sendMyInfo, validator } = require("./controller");
const Response = require("./class_response");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use((_, res, next) => {
	res.setHeader("Content-Type", "application/json");
	next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints
app.get("/", sendMyInfo);
app.post("/validate-rule", validator);

// Middleware that forwards 404 errors
app.use((req, _, next) => {
	next(
		new Response(
			`Cannot ${req.method} ${req.url}, endpoint not available`,
			404
		)
	);
});

// Error Handler
app.use((err, _, res, __) => {
	console.log(err.message);
	if (err instanceof SyntaxError && "body" in err && err.status === 400)
		err = new Response("Invalid JSON payload passed", 400);
	const resp =
		err instanceof Response
			? err
			: new Response("Internal server error occurred", 500);
	res.status(resp.status).send(resp.toJSON());
});

app.listen(process.env.PORT, () =>
	console.log(`Server listening on port ${process.env.PORT}`)
);
