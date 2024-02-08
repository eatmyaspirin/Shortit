const sqlite = require('sqlite3');

const db = new sqlite.Database('./db.sqlite', (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database, configuring tables')
        db.exec(
            `
            CREATE TABLE user (
            userId text PRIMARY KEY,
            username text UNIQUE, 
            password text, 
            isAdmin boolean DEFAULT false,
            CONSTRAINT username_unique UNIQUE (username)
            );
            INSERT INTO user (userId, username, password) VALUES ('0000nouser', '', '');
            CREATE TABLE url (
                urlId text PRIMARY KEY,
                url text, 
                shortUrl text UNIQUE,
                userId text,
                pasteData text,
                isUrl boolean DEFAULT true,
                createdDate text,
                CONSTRAINT shorturl_unique UNIQUE (shortUrl),
                FOREIGN KEY (userId) REFERENCES user(userId)
            );
            CREATE TABLE stats (
                urlId text,
                userId text, 
                visitors text,
                created datetime DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (urlId) REFERENCES url(urlId),
                FOREIGN KEY (userId) REFERENCES user(userId)
            );            
            `,
            (err) => {
                if (err) {
                    const { errno } = err;
                    if (errno === 1) {
                        console.error('Configuration not needed, skipping');
                    } else {
                        console.log(err);
                    }
                }
            });
    }
})

module.exports = db;
