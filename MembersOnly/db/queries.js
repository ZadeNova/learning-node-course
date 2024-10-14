const pool = require('./pool');


async function create_user(user){
    console.log(user)
    console.log('dbb')
    await pool.query(`INSERT INTO theusers (firstname,lastname,username,userpassword,membership_status,user_role) VALUES ('${user.Firstname}' , '${user.Lastname}' , '${user.Email}' , '${user.password}' , '${user.Membership_status}', '${user.role}')`);
}

async function getAllUsers(){
    const { rows } = await pool.query(`SELECT * FROM theusers`)
    const user = rows[0]
    return user;
}

async function checkUser_byUsername(username){
    const { rows } = await pool.query(`SELECT * FROM theusers WHERE username = '${username}'`);

    const user = rows[0]
    return user;
}

async function checkIfAdmin(username){
    const { rows } = await pool.query(`SELECT user_role FROM theusers WHERE username = '${username}'`);
    const result = rows[0].user_role === 'Admin' ? true: false;

    return result;
}



async function get_allMessages(){
    try {
        
        const { rows }  = await pool.query('SELECT * FROM messages');
        
        return rows
    }
    catch(error){
        console.error('Error fetching messages: ',error);
        return null;
    }
}

async function createMessages(msg){
    await pool.query(`INSERT INTO messages (title,msgcontent,msgtimestamp,createdby_user) VALUES ('${msg.title}','${msg.content}','${msg.timestamp}','${msg.createdby_user}')`);

}

async function deleteMessages(id){
    await pool.query(`DELETE FROM messages WHERE msg_id = '${id}'`)
}

// Secret Code

async function getSecretCode(){
    const { rows } = await pool.query(`SELECT * FROM secret_code`);
    return rows;

}

// Change membership status

async function change_membership_status(user){
    await pool.query(`UPDATE theusers SET membership_status = '${'Member'}' WHERE username = '${user}'`);
    
}

async function checkMembershipStatus(user){
    
    const data  = await pool.query(`SELECT membership_status FROM theusers WHERE username = '${user}'`);
    
    return data.rows[0].membership_status === 'Member' ? true : false;
}

module.exports = {
    create_user,
    getAllUsers,
    checkUser_byUsername,
    get_allMessages,
    createMessages,
    deleteMessages,
    getSecretCode,
    change_membership_status,
    checkMembershipStatus,
    checkIfAdmin,
}