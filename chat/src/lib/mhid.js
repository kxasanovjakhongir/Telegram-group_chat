function mhid (index) {
    let code = Date.now() + ((Math.random() * 10).toFixed())
    let readyCode = code.split("").reverse().splice(0, index).join("")
    return readyCode
}

module.exports = mhid