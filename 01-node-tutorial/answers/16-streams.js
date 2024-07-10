const { createReadStream } = require('fs')
const path = require('path');
// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })
console.log('I am called');

const stream = createReadStream(path.resolve(__dirname,'./content/big.txt'));

stream.on('data', (result) => {
  console.log(result)
})
stream.on('error', (err) => console.log(err))
