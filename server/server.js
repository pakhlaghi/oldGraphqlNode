const express = require("express");
const path = require("path");

const graphqlHTTP = require('express-graphql');

const mysql = require('mysql');
const schema = require('./db/schema');

const start = async() => {
    // make database connections
    const mysqlClient = mysql.createConnection({
        host: 'scrumacademia.org',
        user: 'scrumaca_ccc',
        password: 'Code123Core456',
        database: 'scrumaca_codecore'
    });

    try {
        await mysqlClient.connect();
    } catch (e) {
        console.log('Database Connection failed:' + e);
    }

    const app = express();

    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, "public")));

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
        context: { mysqlClient }
    }));

    app.get("/test", function(req, res) {
        mysqlClient.query('SELECT * from user LIMIT 2', function(err, rows, fields) {
            mysqlClient.end();
            if (!err)
                console.log('The solution is: ', rows);
            else
                console.log('Error while performing Query.');
        });
    });

    // Put all API endpoints under '/api'
    app.get("/api/passwords", (req, res) => {
        const count = 5;

        // Generate some passwords
        const passwords = [1, 2];

        // Return them as json
        res.json(passwords);

        console.log(`Sent ${count} passwords`);
    });

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "public/index.html"));
    });

    const port = process.env.PORT || 5000;
    app.listen(port);

    console.log(`listening on ${port}`);

};

start();