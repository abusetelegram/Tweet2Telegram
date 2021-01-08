const fs = require('fs');

const writeData = (path, data) => {
    fs.writeFileSync(path,  JSON.stringify(data));
}

const readData = (path) =>  {
    let last_acquired = null
    try {
        const record = require(path)
        last_acquired = record.last_acquired
    } catch(e) {
        console.log("Unable to read last record...")
    }
    return last_acquired
}

module.exports = {
    writeData,
    readData
}
