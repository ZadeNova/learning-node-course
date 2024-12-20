const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();



async function createUser(req,res){
    console.log('hello there')
    res.status(200).json({
        message: 'It works'
    })

    // 

    try {

    }
    catch(err){
        
    }

}
async function getUser(req,res){
    res.json("hi")




}

async function getAllUsers(req,res){
    res.status(200).json({
        message:' Get all users'
    })

}

async function updateUser(req,res){

}

async function deleteUser(req,res){

}



module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
};
