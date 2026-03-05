const express = require("express");
const app = express();
app.use(express.static("public"));
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
        library: [],
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
        res.status(403).send({ msg: "User not registered" });
    } else {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user);

            res.status(200).send({ username: user.username });
        } else {
            res.status(401).send({ msg: "Incorrect Password" });
        }
    }
});

// change password
app.put("/api/update/pass", async (req, res) => {
    try {
        const token = req.cookies["token"];
        const user = await getUser("token", token);

        if (!user) {
            res.status(402).send({ error: "Invalid token or user not found." });
        } else {
            users[users.indexOf(user)].password = await bcrypt.hash(
                req.body.password,
                10,
            );

            res.status(200).send({ msg: "Password updated successfully" });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).send({ error: "An internal server error occurred." });
    }
});

// change username
app.put("/api/update/user", async (req, res) => {
    try {
        if (await getUser("username", req.body.username)) {
            res.status(409).send({ msg: "Existing user" });
        } else {
            const token = req.cookies["token"];
            const user = await getUser("token", token);

            if (!user) {
                return res
                    .status(402)
                    .send({ error: "Invalid token or user not found." });
            } else {
                users[users.indexOf(user)].username = req.body.username;

                res.status(200).send({ msg: "Username updated successfully" });
            }
        }
    } catch (error) {
        console.error("Error updating username:", error);
        res.status(500).send({ error: "An internal server error occurred." });
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

// get library
app.get("/api/library", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
    } else {
        res.status(200).send({ library: JSON.stringify(user.library) });
    }
});

// add to library
app.put("/api/library", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
    } else {
        user.library.push(req.body)
        res.status(200).send({ msg: "Library updated" });
    }
});

// remove from library
app.delete("/api/library", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
    } else {
        user.library.splice(user.library.length - 1 - req.body.index, 1);
        res.status(200).send({ msg: "Library updated" });
    }
});

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
