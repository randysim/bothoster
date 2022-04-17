const Express = require("express");
const Fs = require("fs")
const Router = Express.Router();

const path = require("path")
const botStatus = require("../botStatus.js")

Router.post("/", async (req, res) => {
    let indexFile = req.body.index;
    let authToken = req.body.token;
    let username = req.body.username;
    let botName = req.body.botName;

    console.log(req.body)

    if (!indexFile) return res.send({ success: false, error: "missing index" })
    if (!authToken) return res.send({ success: false, error: "missing token" })
    if (!username) return res.send({ success: false, error: "missing username" })
    if (!botName) return res.send({ success: false, error: "missing bot name" })

    let userFile = path.join(__dirname, `../users/${username}.json`)

    if (!Fs.existsSync(userFile)) return res.send({ success: false, error: "Invalid Username" });

    let userData = JSON.parse(Fs.readFileSync(userFile));

    if (userData.token != authToken) return res.send({ success: false, error: "Invalid Token" })

    // create bot file now
    let botFolder = path.join(__dirname, `../bots/${botName}-${userData.id}`);
    if (Fs.existsSync(botFolder)) return res.send({ success: false, error: "Bot Name already exists" });

    Fs.mkdirSync(botFolder);

    let botIndex = `${botFolder}/index.js`
    let botMeta = `${botFolder}/meta.json`

    indexFile = `module.exports = async () => {\n` + indexFile + `\n}`

    Fs.writeFileSync(botIndex, indexFile)
    Fs.writeFileSync(botMeta, JSON.stringify({ authorId: userData.id, error: false }));

    await botStatus.runBot(botName, userData.id);

    res.send({ success: true, status: botStatus.getStatuses()[`${botName}-${userData.id}`] })
});

module.exports = Router;