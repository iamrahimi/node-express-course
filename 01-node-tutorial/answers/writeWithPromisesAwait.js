const path = require('path');
const { writeFile, readFile } = require("fs").promises;  

const writer = async () => {
    try {
      await writeFile(path.resolve(__dirname,'./temporary/temp.txt'), "1st Line", (err) => {
              if (err) {
                console.log(err)
                return
              }
              console.log("The file was saved!");
            }
        ).then (() => {
            writeFile(path.resolve(__dirname,'./temporary/temp.txt'), "2nd line")
        }).then (() => {
            writeFile(path.resolve(__dirname,'./temporary/temp.txt'), "3rd line")
        })
        
    } catch (error) {
        console.log('An error occurred:', error);
        
    }
}



exports.writer = writer;






