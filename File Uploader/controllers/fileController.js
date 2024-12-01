const { PrismaClient } = require('@prisma/client');
const { SupabaseClient } = require('@supabase/supabase-js');
const { connect } = require('http2');
const prisma = new PrismaClient();
const multer = require("multer");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dsj8ktewz',
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
    secure: true,
    
})
// Import items from supabase.js
const {
    uploadFileSB,
    deleteFileSB,
    downloadFileSB,
    updateFileNameSB,
} = require("../config/supabase-client");
const { equal } = require('assert');


async function uploadFile(req,res){


    // Check if there is a parent directory first.
    // Check if file is created in root or in a folder.

    const uploadedFile = req.file;
    const fileName = req.file.originalname;
    const uploadedFilePath = req.file.path;
    //const filePath = `${req.session.passport.user}/${fileName}`;
    



    if (req.body.parentDir){
        

       
        
        

        // Cloundinary Function
        // Upload image to cloudinary
        
        const result = await cloudinary.uploader.upload(uploadedFilePath);

        // Fs unlink sync is taking too long 
        fs.unlinkSync(uploadedFilePath);
        
        
        // Prisma function

        await prisma.fileTable.create(
            {data:
                {
                    file_name: req.file.originalname,
                    file_type: req.file.mimetype,
                    file_url: result.secure_url,
                    creator:{
                        connect:{
                           id:  req.session.passport.user,
                        }
                    },
                    Folder:{
                        connect:{
                            id: req.body.parentDir
                        }
                    },
                    file_size: result.bytes,
                }
            }
        )


    }
    else{
        // Means parent directory does not exist
        // insert file into cloudinary and DB. Cloudinary DB for storing the entire file content. Prisma for storing useful file information
       


        const result = await cloudinary.uploader.upload(uploadedFilePath);
        
        fs.unlinkSync(uploadedFilePath);
        

        await prisma.fileTable.create(
            {data:
                {
                    file_name: req.file.originalname,
                    file_type: req.file.mimetype,
                    file_url: result.secure_url,
                    file_size: result.bytes,
                    creator:{
                        connect:{
                           id:  req.session.passport.user,
                        }
                    },
                }
            }
        )





    }
    
    
    res.redirect('/index')
}

async function deleteFile(req,res){

    try{
        
        const file = await prisma.fileTable.findFirst({
            where:{
                id:req.params.id,
            }
        })


        const publicName = extractFileName(file.file_url);

       

        await prisma.fileTable.delete({
            where:{
                id: req.params.id
            }
        })


        // Use public name to destroy file in cloudinary
        const result = await cloudinary.uploader.destroy(publicName)
       



    }
    catch(err){
        console.error(err);
    }

}

// This function is just to edit file name
async function updateFile(req,res){
    
    console.log(req.params.id)
    console.log("Edit file name")

    let newFileName = req.body.editfilename
    let file_ext;
    // Check if there is file extension.
    // If new name has no extension add the extension.

    if (!newFileName.includes(".")){
        console.log('hi')
        let file = await prisma.fileTable.findUnique({
            where: {id: req.params.id}
        })
        file_ext = file.file_type.match(/\/.+/)[0].substring(1);
        
        
        try{
            console.log(await prisma.fileTable.update({
                where: {
                    id: req.params.id
                },
                data: {
                    file_name: newFileName.concat(".",file_ext)
                }
            }))
        }
        catch(err){
            console.error(err);
        }
        
    }
    else{
        try {
            await prisma.fileTable.update({
                where: {
                    id: req.params.id,
                },
                data: {
                    file_name: req.body.editfilename,
                }
            })
        }
        catch(err){
            console.error(err);
        }

    }
    

    

    res.redirect("/index")
}

async function getFile(req,res){

    // Get image url from cloudinary

    console.log(req.params.id);
    let file_url;

    try {
        let file = await prisma.fileTable.findUnique({
            where: {
                id: req.params.id
            }
            
        })

        file_url = file.file_url;

        //console.log(cloudinary.url(extractFileName(file.file_url),{flags:'attachment'}));

        res.render("fileview",{
            title: "File View",
            file_url: file_url,
            file_size: file.file_size,
            file_type: file.file_type,
            file_name: file.file_name,
            file_uploadedDate: file.createdAt,
        })
    
    }
    catch(err){
        console.error(err);
    }

    

}

function downloadFile(req,res){

    console.log(req.params.id);
    

}

// This function extracts the cloudinary public file name. The name will be without the file extension.
function extractFileName(url){


    const startIndex = url.lastIndexOf("/") + 1;

    const endIndex = url.length;
    const nameWithFileExtension = url.substring(startIndex,endIndex);
    


    return nameWithFileExtension.substring(0,nameWithFileExtension.indexOf("."))


}



module.exports = {
    uploadFile,
    deleteFile,
    updateFile,
    getFile,
}