const sqlite = require('sqlite3');
const db = new sqlite.Database('shortenService', (err) => {
    if (err) {
        console.error(err.message)
        throw err
      }else{
          console.log('Connected to the SQLite database.')
          db.run(`CREATE TABLE url (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url text, 
            shorturl text UNIQUE, 
            CONSTRAINT shorturl_unique UNIQUE (shorturl)
            )`,
        (err) => {
            if (err) {
                console.error('Table already exists');
            }else{
                let insert = 'INSERT INTO url (url, shorturl) VALUES (?,?)'
                db.run(insert, ["test.com","sydsikc"]);
            }
        });    
      }
})

module.exports = db;
