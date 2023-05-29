/** @format */

const express = require("express");

const authenticate = require("./middleware/authenticate");
const connect_db = require("./db");

const router = require("./routes/index");

const app = express();
app.use(express.json());

app.use(router);

app.get("/private", authenticate, async (req, res) => {
    return res.status(200).json({ message: "I am private route" });
});

app.get("/public", (req, res) => {
    return res.status(200).json({ message: "I am public route" });
});

app.get("/", (_req, res) => {
    const obj = {
        name: "Ayman",
        email: "ayman@gmail.com",
    };
    res.json(obj);
});

app.use((err, req, res, next) => {
    console.log(err);

    const message = err.message ? err.message : "Server Error occurred";
    const status = err.status ? err.status : 500;
    res.status(status).json({
        message,
    });
});

const port = 3000;

connect_db("mongodb://localhost:27017/attendance-db")
    .then(() => {
        console.log("database connected");
        app.listen(port, () => {
            console.log(`listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("error: ", err);
    });
