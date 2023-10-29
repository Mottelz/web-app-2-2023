const fs = require('fs');
const db = require('better-sqlite3')('./payme.db', { verbose: console.log });

// initialize the database using the script in init.sql
const init = async () => {
    const script = fs.readFileSync('./lib/core/init.sql', 'utf8');
    await db.exec(script);
};


module.exports = {
    db,
    init
};
