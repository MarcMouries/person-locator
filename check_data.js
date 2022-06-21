require("./user_data.js");

console.log( "Number of users = " + user_data.length )

user_data.forEach((user, index) => 
{
    /* ... */ 
    const user_index = (++index +"").padStart(2, '0');
    const user_name  = user.full_name.padEnd(16, ' ');
    console.log( "User #" + user_index  +  " : " + user_name +  ", " + user.mobile_phone )
})
