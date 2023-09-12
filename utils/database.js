const sqlite = require('sqlite3');

const db = new sqlite.Database('./utils/db', (err) => {
    if (err) {
        console.error(err.message)
        throw err
      }else{
          console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            userId text PRIMARY KEY,
            username text UNIQUE, 
            password text, 
            CONSTRAINT username_unique UNIQUE (username)
            )`,
        (err) => {
            if (err) {
                console.error('1st', err);
            } 
            db.run(`CREATE TABLE url (
                urlId text PRIMARY KEY,
                url text, 
                shortUrl text UNIQUE,
                userId text,
                CONSTRAINT shorturl_unique UNIQUE (shorturl),
                FOREIGN KEY (userId) REFERENCES user(userId)
                )`,
            (err) => {
                if (err) {
                    console.error('2nd', err);
                } 
                db.run(`CREATE TABLE stats (
                    urlId text,
                    userId text, 
                    visitors text,
                    FOREIGN KEY (urlId) REFERENCES url(urlId),
                    FOREIGN KEY (userId) REFERENCES user(userId)
                    )`,
                (err) => {
                    if (err) {
                        console.error('3rd', err);
                    }
                }); 
            });
        });    
      }
})

module.exports = db;
