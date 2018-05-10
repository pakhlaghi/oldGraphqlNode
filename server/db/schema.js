const fileSync = require('fs');
const path = require("path");
const resolvers = require("./resolvers");

const { makeExecutableSchema } = require('graphql-tools');

// graphql
const schemaFile = path.join(__dirname, 'schema.graphql');
const typeDefs = fileSync.readFileSync(schemaFile, 'utf8');

// pass the resolver map as second argument
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;