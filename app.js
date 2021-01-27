const express = require("express");
const { sendHomeInfo, validateRule, errorHandler } = require("./controller");
require("dotenv").config();

const app = express();

app.get("/", sendHomeInfo);

// app.post("/validate-rule", validateRule);

// app.use(errorHandler);

app.listen(process.env.PORT, () =>
	console.log(`Server listening on port ${process.env.PORT}`)
);
