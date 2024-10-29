const { PrismaClient } = require('@prisma/client');
const { connect } = require('http2');
const prisma = new PrismaClient();


async function create_folder(req,res){
    console.log(req.body);
    
    // If parentDir has value it means you are creating a child folder.

    let newlyCreatedFolder;
    let newlyCreatedFolderID;
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


            newlyCreatedFolder = await prisma.folderTable.findMany({where:
                {AND:
                    [
                        {folder_name: 
                            {
                                equals: req.body.foldername
                            }
                        },
                        {parentId: 
                            {
                                equals: req.body.parentDir
                            }
                        }
                    ]
                }
            })

            newlyCreatedFolderID = newlyCreatedFolder[0].id
            res.redirect(`/folder/${newlyCreatedFolderID}`);
        }
        else{

            await prisma.folderTable.create({
            data: {
                folder_name: req.body.foldername,
            }
        })

            newlyCreatedFolder = await prisma.folderTable.findUnique({
                where: {
                    folder_name: req.body.foldername,
                }
            })
            newlyCreatedFolderID = newlyCreatedFolder.id


            res.redirect('/index');

        }
        
        

        
        
    }
    catch(err){
        console.error(err);
    }
    

}

async function get_folder(req,res){
    
    console.log(req.params.id);
    
    // Check if its parent folder or child folder.
    const folder = await prisma.folderTable.findUnique({where:{id:req.params.id}})
    // console.log(folder)
    // console.log(folder.parentId)
    const isRootFolder = folder.parentId === null ? true : false;
    const currentDir = req.params.id;
    console.log(isRootFolder);
    console.log(req.path);

    
    // Try to query all the children under the parent directory. 
    // Parent directory will be under req.params.id ( this is the ID of the folder.)
    // Ensure that the same logic is applied to files too.


    // Breadcrumb function

    // Find the current folder that you are in and keep finding the parent folders until parent property is null.
    // Completed Breadcrumb is an array of objects with property foldername and folderlink.
    // Folder name is what folder you are in.
    // Folder link is the link to each folder.
    // Parent folder link is always index btw.


    // The way i display my folders. I am not allowed to click any buttons inside the box. This is because of my <a> tag class folder-container


    let breadcrumb = await find_parents(currentDir);
    let completedBreadcrumb = []
    

    // Ensure that the completed breadcrumb variable first element is index.
    completedBreadcrumb.push({folderName: "Index", folderlink: "/index"});
    for(let i = 0; i < breadcrumb.length; i++){
        let folderPath = await prisma.folderTable.findUnique({where:{folder_name:breadcrumb[i]}})
        completedBreadcrumb.push({folderName: breadcrumb[i], folderlink: `/folder/${folderPath.id}`})

    }

    

    let children;
    try {

        children = await prisma.folderTable.findMany({
            where:{
                parentId:{
                    equals: currentDir
                }
            }})

    }catch(err){
        console.error(err);
    }
    //console.log(children)

    res.render('folderview',{
        title: "Folder View",
        login_status: res.locals.login_status,
        isRoot: isRootFolder,
        currentDir: currentDir,
        children: children,
        completedBreadcrumb: completedBreadcrumb
    });

}

async function update_folder(req,res){
    console.log('hadjkadahkjdawjkdawhjkda')
    const folderID_beingEdited = req.params.id;
    //console.log(folderID);
    //console.log(req.body);


    try {
        await prisma.folderTable.update({
            where: {id: folderID_beingEdited},
            data: {folder_name: req.body.editfoldername}
        })

        const folder = await prisma.folderTable.findUnique({where: {
            id: folderID_beingEdited,
        }})
        console.log(folder)
        


        let parentFolderID;

        // IF the folder is a root folder , redirect to index.
        if (!(folder.parentId === null)){
            parentFolderID = folder.parentId;
            res.redirect(`/folder/${parentFolderID}`);
            // Will redirect to parent. So if python is under programming folder. But you are editing python folder , will redirect to programming folder. This is so that you can see the updated folder name.
        }
        else{
            res.redirect('/index')
        }

        

        
    }
    catch(err){
        console.error(err);
    }

    

}

async function delete_folder(req,res){

    console.log('hi i want to delete you')
    console.log(req.params.id);
    // Now write the logic for deleting. 
    // If the folder that you are deleting has children. Delete all the children as well.
    // This is solved by OnDelete: Cascade in Prisma Schema
    try{

        const folder_beingdeleted = await prisma.folderTable.findUnique({
            where: {
                id: req.params.id,
            }
        })

        

        await prisma.folderTable.delete(
            {where:{
                id: req.params.id,
            }}
        )

        // if ((folder_beingdeleted.parentId === null)){
        //     console.log('redirecteds')
        //     res.redirect('/index')
        // }
        // else{
            
        //     res.redirect(`/folder/${folder_beingdeleted.parentId}`)
        // }

    }
    catch(err){
        console.error(err);
    }

    

    


}

// Recursive function
async function find_parents(id,breadCrumb_array = []){
    try{

        
        const isParent = await prisma.folderTable.findUnique({
            where: {
                id: id
                
            }
        })
        console.log('breadcrumb recursive function>?')
        console.log(isParent);
        if (isParent.parentId === null){
            breadCrumb_array.push(isParent.folder_name)
            
            
            return breadCrumb_array.reverse();
        }
        else{
            
            breadCrumb_array.push(isParent.folder_name)
            console.log(breadCrumb_array)
            const newBreadcrumbs = await find_parents(isParent.parentId, breadCrumb_array)
            return newBreadcrumbs

        }
    }
    catch(err){
        console.error(err);
    }
}


module.exports = {
    create_folder,
    get_folder,
    update_folder,
    delete_folder,
}