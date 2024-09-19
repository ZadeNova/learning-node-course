const fs = require('fs');

// Reading Files
// fs.readFile('./docs/blog1.txt', (err,data) => {
//     if (err){
//         console.log(err);
//     }
//     console.log(data);
// });

// Writing Files
// fs.writeFile('./docs/blog1.txt', 'hello world', () => {
//     console.log('file was written');
// });


// Directories

if(!fs.existsSync('./assets')){
    fs.mkdir('./assets',(err) => {
        if (err){
            console.log(err);
        }
        console.log('folder created');
    })
    
} else {
    fs.rmdir('./assets',(err) => {
        if(err){
            console.log(err)
        }
        console.log('folder deleted');
    })
}

// Delete Files

if (fs.existsSync('./docs/deleteme.txt')){
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    });
}