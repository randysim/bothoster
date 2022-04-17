const Express = require("express");
const App = Express();

const Fs = require("fs");
const path = require("path")
const Cors = require("cors")
const BodyParser = require("body-parser")

const botStatus = require("./botStatus.js")

const runBots = async () => {
    Fs.readdir(path.join(__dirname, "/bots"), (err, files) => {
        files.forEach(file => {
            let botMeta = JSON.parse(Fs.readFileSync(path.join(__dirname, `/bots/${file}/meta.json`)))
            botStatus.runBot(file.split("-")[0], botMeta.authorId)
        })
    });
}

runBots()

App.use(Cors());
App.use(BodyParser.json());
App.use(Express.static(path.join(__dirname, "../frontend/build/")))

App.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "/../frontend/build/index.html"))
})

/* BACKEND ROUTES */
App.use("/api/createbot", require("./routes/createBot.js"));
App.use("/api/createaccount", require("./routes/createAccount.js"))
App.use("/api/login", require("./routes/login.js"));
App.use("/api/getuserbots", require("./routes/getUserBots.js"))

App.listen(80, () => {
    console.log(`App is running on Port 80`);
});

