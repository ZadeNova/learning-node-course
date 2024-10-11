const pool = require('./pool');


async function create_user(user){
    console.log(user)
    console.log('dbb')
    await pool.query(`INSERT INTO theusers (firstname,lastname,username,userpassword,membership_status,user_role) VALUES ('${user.Firstname}' , '${user.Lastname}' , '${user.Email}' , '${user.password}' , '${user.Membership_status}', '${user.role}')`);
}

async function getAllUsers(){
    const { rows } = await pool.query(`SELECT * FROM public."TheUsers"`)
    const user = rows[0]
    return user;
}

async function checkUser_byUsername(username){
    const { rows } = await pool.query(`SELECT * FROM theusers WHERE username = '${username}'`);

    const user = rows[0]
    return user;
}



async function createMessages(){

}

async function deleteMessages(){
    
}

module.exports = {
    create_user,
    getAllUsers,
    checkUser_byUsername,
}