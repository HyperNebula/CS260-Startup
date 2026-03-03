const express = require("express");
const app = express();
app.use(express.static('public'));
app.use(express.json());

const bcrypt = require("bcryptjs");
const uuid = require("uuid");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = [];

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
    };

    users.push(user);

    return user;
}

function getUser(field, value) {
    if (value) {
        return users.find((user) => user[field] === value);
    }
    return null;
}

function setAuthCookie(res, user) {
    user.token = uuid.v4();

    res.cookie("token", user.token, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10800,
    });
}

function clearAuthCookie(res, user) {
    delete user.token;
    res.clearCookie("token");
}

// registration
app.post("/api/auth", async (req, res) => {
    if (await getUser("username", req.body.username)) {
        res.status(409).send({ msg: "Existing user" });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user);

        res.status(200).send({ username: user.username });
    }
});

// login
app.put("/api/auth", async (req, res) => {
    const user = await getUser("username", req.body.username);
    if (!user) {
        res.status(403).send({ msg: "Unauthorized" });
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user);

        res.status(200).send({ username: user.username });
    } else {
        res.status(401).send({ msg: "Unauthorized" });
    }
});

// logout
app.delete("/api/auth", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (user) {
        clearAuthCookie(res, user);
    }

    res.status(200).send({});
});

// getMe
app.get("/api/user/me", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (user) {
        res.status(200).send({ username: user.username });
    } else {
        res.status(401).send({ msg: "Unauthorized" });
    }
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
