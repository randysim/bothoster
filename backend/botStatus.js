const status = {}

const getStatus = () => status
const setStatus = (newStat) => status = newStat
const path = require("path")

const Fs = require("fs");

module.exports = {
    getStatuses: getStatus,
    setStatuses: setStatus,
    async runBot(botName, authorId) {
        let botFile = require(`./bots/${botName}-${authorId}/index.js`)
        let metaPath = path.join(__dirname, `/bots/${botName}-${authorId}/meta.json`)
        let botMeta = JSON.parse(Fs.readFileSync(metaPath))

        try {
            await botFile()
            status[`${botName}-${authorId}`] = { running: true, error: false }
            botMeta.error = false;
            Fs.writeFileSync(metaPath, JSON.stringify(botMeta))
            console.log(`Running ${botName}-${authorId}`)
        } catch (err) {
            status[`${botName}-${authorId}`] = { running: false, error: true }
            botMeta.error = true;
            Fs.writeFileSync(metaPath, JSON.stringify(botMeta))
            console.log(`Error on ${botName}-${authorId}`)
        }
    }
}