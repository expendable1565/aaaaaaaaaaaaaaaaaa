const fs = require('fs');
const child_process = require("child_process")
const readline = require("readline")

function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}

function ask(question) {
    const line = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return new Promise((resolve) => {
        line.question(question, (answer) => {
            line.close()
            resolve(answer)
        })
    })
}

(async () => {
    var setData = {}

    for (var set = 6; set <= 10; set++) {
        var things = fs.readdirSync(`./folder/first/${set}/`)
        var audios = []
        for (var file of things) {
            if (!file.includes(".mp3")) {
                continue
            }
            while (true) {
                child_process.exec(`C:\\Users\\admin\\Projects\\PATH\\ffplay.exe -nodisp -autoexit -i ${__dirname}\\folder\\first\\${set}\\${file}`)

                var answer = await ask("Input Word : ")
                if (`${answer}.mp3` == file.toLowerCase()) {
                    break
                }
            }

            //var proc = child_process.exec(`C:\\Users\\admin\\Projects\\PATH\\ffplay.exe -nodisp -autoexit -i ${__dirname}\\folder\\first\\${set}\\${file}`)
            //child_process.spawn(`C:\\Users\\admin\\Projects\\PATH\\ffplay.exe`, ["-i", __dirname + `folder/first/${set}/${file}.mp3`]).on("error", (err) => console.log(err))
            //console.log(`C:\\Users\\admin\\Projects\\PATH\\ffplay.exe -i ${__dirname}\\folder\\first\\${set}\\${file}`)
            //await wait(1)
        }
    }

})()