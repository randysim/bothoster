const Express = require("express");
const Router = Express.Router();
const Fs = require("fs");
const path = require("path")
const botStatus = require("../botStatus.js");

Router.post("/", async (req, res) => {
    let username = req.body.username;
    let authToken = req.body.token;

    if (!username) return res.send({ success: false, error: "Missing Username" });
    if (!authToken) return res.send({ success: false, error: "Missing Token" });

    let userFile = path.join(__dirname, `../users/${username}.json`);

    if (!Fs.existsSync(userFile)) return res.send({ success: false, error: "Invalid Username" });

    let userData = JSON.parse(Fs.readFileSync(userFile));
    if (!userData.token == authToken) return res.send({ success: false, error: "Invalid Token" });

    let botDir = path.join(__dirname, "../bots")
    let data = []
    Fs.readdir(botDir, (err, files) => {
        files.forEach(file => {
            let botMeta = path.join(__dirname, `../bots/${file}/meta.json`);
            let botData = JSON.parse(Fs.readFileSync(botMeta));

            if (botData.authorId != userData.id) return;

            let botName = file.split("-")[0];
            let botRunning = botStatus.getStatuses()[`${botName}-${userData.id}`];

            data.push({ name: botName, running: botRunning.running })
        })

        res.send({ success: true, botData: data })
    });


});

module.exports = Router;