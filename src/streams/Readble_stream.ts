

const fs = require("fs")
const read_stream = fs.createReadStream('./src/streams/name.txt')
read_stream.on("data", (chunk)=>{
    console.log(chunk.toString(), 'chunk')
})

const wtite_stream = fs.createWriteStream('./src/streams/name.txt');
wtite_stream.write("Hello")
wtite_stream.on("write completed",(writ)=>{
    console.log(writ.toString())
})