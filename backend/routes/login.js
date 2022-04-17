const Express = require("express");
const Router = Express.Router();
const Fs = require("fs");
const path = require("path")

Router.post("/", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username) return res.send({ success: false, error: "Invalid Username" });
    if (!password) return res.send({ success: false, error: "Invalid Password" });

    let userFile = path.join(__dirname, `../users/${username}.json`);

    if (!Fs.existsSync(userFile)) return res.send({ success: false, error: "Invalid Username" });

    let userData = JSON.parse(Fs.readFileSync(userFile));
    if (userData.password != password) return res.send({ success: false, error: "Invalid Password" })

    res.send({ success: true, token: userData.token })
});

module.exports = Router;