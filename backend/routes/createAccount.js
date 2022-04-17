const Express = require("express");
const Router = Express.Router();

const Fs = require("fs")
const path = require("path")

const generateId = () => {
    let chars = "ABCDEFGHIJKLMNOPOQRSTUVWXYZ0123456789";

    let code = "";

    for (let i = 0; i < 9; ++i) {
        code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
}

Router.post("/", async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (!username) return res.send({ success: false, error: "Missing Username" })
    if (!password) return res.send({ success: false, error: "Missing Password" })

    let userId = generateId()
    let authToken = generateId()

    let relativePath = `../users/${username}.json`;
    let absolutePath = path.join(__dirname, relativePath)

    if (Fs.existsSync(absolutePath)) return res.send({ sucess: false, error: "Username Taken" })

    Fs.writeFileSync(absolutePath, JSON.stringify({ id: userId, username: username, password: password, token: authToken }))

    return res.send({ success: true, token: authToken });
});

module.exports = Router;