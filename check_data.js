const fs = require('fs').promises;

async function main() {
    const FILE_NAME = 'users.json';
    const user_data = await readJSONFile(FILE_NAME);

    console.log("Number of users =", user_data.length);

    user_data.forEach((user, index) => {
        const user_index = (++index + "").padStart(2, '0');
        const user_name = user.full_name.padEnd(16, ' ');
        console.log("User #" + user_index + " : " + user_name + ", " + user.mobile_phone);
    });
}

async function readJSONFile(filename) {
    try {
        const data = await fs.readFile(filename, 'utf-8');
        //console.log("readJSONFile: data", data);

        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading the file:', error);
    }
}

main().catch(error => {
    console.error('Error in main:', error);
});
