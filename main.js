const fs = require("fs");

var strings

function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}

function downloadSound(text, path) {
    var resolveFunc 
    var promise = new Promise((resolve) => {
        resolveFunc = resolve
    })
    var file = fs.createWriteStream(path)
    fetch("https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=" + text)
    .then(response => {
        return response.arrayBuffer()
    }).then(buffer => {
        console.log("Done " + path)
        resolveFunc()
        fs.promises.writeFile(path, Buffer.from(buffer))
    }).catch(error => {
        console.log(error)
    })
    return promise
}

fs.readFile("./strings.txt", async (err, data) => {
    var text = data.toString()
    var rows = text.split("\n")
    data = {}
        
    for (var value1 of rows) {
        var columns = value1.split(" ")
        for (var [col, value] of columns.entries()) {
            if (!data[col]) {
                data[col] = ""
                //downloadSound(value, `./folder/first/${col+1}/${value}.mp3`)
            }
            value = value.replace("\r", "")
            await wait(.1);
            //console.log(`./folder/first/${col+6}/${value}.mp3`)
            await downloadSound(value, `./folder/first/${col+6}/${value}.mp3`)
        }
    }
    
    for (const [key, value] of Object.entries(data)) {
        fs.writeFileSync(`./folder/first/${Number(key) + 1}/data.txt`, value)
    }
})
