const express = require("express");
const path = require("path");

const fs = require('fs');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

const { Client } = require('pg');
const mysql = require('mysql')

// graphql
const tweets = [
    { id: 1, body: 'Lorem Ipsum', date: new Date(), author_id: 10 },
    { id: 2, body: 'Sic dolor amet', date: new Date(), author_id: 11 }
];
const authors = [
    { id: 10, username: 'johndoe', first_name: 'John', last_name: 'Doe', avatar_url: 'acme.com/avatars/10' },
    { id: 11, username: 'janedoe', first_name: 'Jane', last_name: 'Doe', avatar_url: 'acme.com/avatars/11' },
];
const stats = [
    { tweet_id: 1, views: 123, likes: 4, retweets: 1, responses: 0 },
    { tweet_id: 2, views: 567, likes: 45, retweets: 63, responses: 6 }
];
const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');

const getAllFromTable = (context, table) => {
    return new Promise((resolve, reject) => {

        context.mysqlClient
            .query(`SELECT * from ${table}`, (err, rows) => {
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            });

    });
};

const getDataById = (context, table, id) => {
    return new Promise((resolve, reject) => {

        context.mysqlClient
            .query(`SELECT * from ${table} where id = ${id}`, (err, rows) => {
                if (!err) {
                    resolve(rows[0]);
                } else {
                    reject(err);
                }
            });

    });
};

const insertData = (context, table, dataObj) => {
    let fields = '';
    let values = '';
    for (key in dataObj) {
        fields += `, ${key}`;
        if (Number.isInteger(dataObj[key])) {
            values += `, ${dataObj[key]}`;
        } else {
            values += `, '${dataObj[key]}'`;
        }

    }

    const query = `insert into ${table} (${fields.substr(1)}) values (${values.substr(1)})`;
    context.mysqlClient.query(query);
};

const updateData = (context, table, dataObj, condition) => {
    let update = '';
    for (key in dataObj) {
        if (Number.isInteger(dataObj[key])) {
            update += `, ${key} = ${dataObj[key]}`;
        } else {
            update += `, ${key} = '${dataObj[key]}'`;
        }
    }
    const query = `update ${table} set ${update.substr(1)} where ${condition};`;
    console.log(query);
    context.mysqlClient.query(query);
};

const deleteData = (context, table, id) => {

    const query = `delete from ${table} where id = ${id};`;
    console.log(query);
    context.mysqlClient.query(query);
};

const resolvers = {
    Query: {
        Tweets: (_, __, context) => getAllFromTable(context, 'tweet'),
        Tweet: (_, { id }, context) => getDataById(context, 'tweet', id)
    },
    Mutation: {
        createTweet: (_, { body }, context) => {
            const newData = {
                date: new Date(),
                author_id: 10,
                body,
            };
            insertData(context, 'tweet', newData);
            return newData;
        },
        updateTweet: (_, { body, id }, context) => {
            const data = {
                author_id: 11,
                body,
            };
            updateData(context, 'tweet', data, `id = ${id}`);
            return true;
        },
        deleteTweet: (_, { id }, context) => {
            deleteData(context, 'tweet', id);
            return true;
        },
    }
};

// pass the resolver map as second argument
const schema = makeExecutableSchema({ typeDefs, resolvers });

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

    // const pgClient = new Client('postgres://scrumaca_ccc:Code123Core456@scrumacademia.org/scrumaca_codecore');
    // await pgClient.connect();


    const app = express();

    // Serve static files from the React app
    app.use(express.static(path.join(__dirname, "public")));

    // mysqlClient.query('SELECT * from tweet', function(err, rows, fields) {
    //     if (!err)
    //         console.log('The solution is: ', rows);
    //     else
    //         console.log('Error while performing Query.');
    // });

    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true,
        context: { mysqlClient }
    }));

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