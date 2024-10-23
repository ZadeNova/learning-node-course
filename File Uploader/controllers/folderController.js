const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();


async function create_folder(req,res){
    console.log(req.body);
    
    // If parentDir has value it means you are creating a child folder.


    // Write prisma code to create folder in database
    try{

        if (req.body.parentDir){
            await prisma.folderTable.create({
            data: {
                folder_name: req.body.foldername,
                parent: {
                    connect: {
                        id: req.body.parentDir
                    }
                }
            }
            })
        }
        else{
            await prisma.folderTable.create({
            data: {
                folder_name: req.body.foldername,
            }
        })
        }
        


        // Redirect to Index page
        res.redirect("/index");
    }
    catch(err){
        console.error(err);
    }
    

}

async function get_folder(req,res){
    
    console.log(req.params.id);
    
    // Check if its parent folder or child folder.
    const folder = await prisma.folderTable.findUnique({where:{folder_name:req.params.id}})
    const isRootFolder = folder.parentId === null ? true : false;
    const currentDir = req.params.id;
    console.log(isRootFolder);
    console.log(req.path);
    res.render('folderview',{
        title: "Folder View",
        login_status: res.locals.login_status,
        isRoot: isRootFolder,
        currentDir: currentDir});

}

module.exports = {
    create_folder,
    get_folder,
}