const calcTip = (total, tipPercent) =>{
    const tip = total * tipPercent;
    return total + tip
}

const add = (a, b) =>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000)
    })
}

module.exports = {
    calcTip,
    add
}