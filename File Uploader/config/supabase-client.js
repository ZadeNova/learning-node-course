
const{ createClient, SupabaseClient } = require('@supabase/supabase-js');
const { decode } = require("base64-arraybuffer");


const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl,supabaseKey);
const fs = require("fs")
const BUCKET_NAME = "fileuploaderapp"

//export default supabase;

async function uploadFileSB(filePath, file){
    console.log("UPLOADING FILE NOW!")
    // filePath is UserID + fileID?
    //const fileBuffer = file.buffer.toString('base64');
    console.log(filePath)
    //const a = fs.readFileSync(file.path)
    //console.log(fs.createReadStream(file.path));
    const { data , err } = await supabase.storage.from("fileuploaderapp").upload(filePath,fs.createReadStream(file.path),{contentType: file.mimetype,duplex: "half"});
    fs.unlinkSync(file.path);
    if (err){
        console.error(err);
        
    } else{
        console.log("File uploaded successfully")
    }
    
    return data;
}

async function deleteFileSB (filePath){

}

async function downloadFileSB (filePath){

}

async function updateFileNameSB(oldFilePath, newFilePath){

}

module.exports = {
    uploadFileSB,
    deleteFileSB,
    downloadFileSB,
    updateFileNameSB,
}