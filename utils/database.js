const sqlite = require('sqlite3');

const db = new sqlite.Database('./db', (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database, configuring tables')
        db.exec(
            `CREATE TABLE user (
            userId text PRIMARY KEY,
            username text UNIQUE, 
            password text, 
            CONSTRAINT username_unique UNIQUE (username)
            );
            CREATE TABLE url (
                urlId text PRIMARY KEY,
                url text, 
                shortUrl text UNIQUE,
                userId text,
                CONSTRAINT shorturl_unique UNIQUE (shorturl),
                FOREIGN KEY (userId) REFERENCES user(userId)
            );
            CREATE TABLE stats (
                urlId text,
                userId text, 
                visitors text,
                FOREIGN KEY (urlId) REFERENCES url(urlId),
                FOREIGN KEY (userId) REFERENCES user(userId)
            );            
            `,
            (err) => {
                if (err) {
                    const { errno } = err;
                    if (errno === 1) {
                        console.error(err.message, 'configuration not needed, skipping');
                    } else {
                        console.log(err);
                    }
                }
            });
    }
})

module.exports = db;
