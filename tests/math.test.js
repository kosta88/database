const {calcTip, add} = require('../src/math')

test('shld calc total sum with tip', () => {
    const total = calcTip(10 , .3 )
    expect(total).toBe(13)                  //>>>>>>>>>>>>>>>>>    A LOL OF OPTION IN JEST DOCS 
    // if(total !== 13){
    //     throw new Error(`total sum should be 13, but it is > ${total}`)
    // }
})


//>>>>>>>>>>>>>>>>>>>>>>>>  ASYNC CODE JEST
test('ASYNC TEST DEMO', (done) => {
    setTimeout(() => {
        expect(1).toBe(3)                
        done()
    }, 2000);
    // if(total !== 13){
    //     throw new Error(`total sum should be 13, but it is > ${total}`)
    // }
})














// test( 'Hello' , () => {
// })

// test( 'this is fail test' , () => {
//     throw new Error('failed')
// })