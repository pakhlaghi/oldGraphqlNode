const query = require('./query');

const resolvers = {
    Query: {
        // _ and __ are just parameter like a and b 
        // (previousValue, parameters) => data
        // (previousValue, parameters, context) => data
        // stored the database connections in the GraphQL server context, 
        // which is passed as third argument to all resolver functions
        Tweets: (_, __, context) => query.getAllFromTable(context, 'tweet'),
        Tweet: (_, { id }, context) => query.getDataById(context, 'tweet', id)
    },
    Mutation: {
        createTweet: (_, { body }, context) => {
            const newData = {
                date: new Date(),
                author_id: 10,
                body,
            };
            query.insertData(context, 'tweet', newData);
            return newData;
        },
        updateTweet: (_, { body, id }, context) => {
            const data = {
                author_id: 11,
                body,
            };
            query.updateData(context, 'tweet', data, `id = ${id}`);
            return true;
        },
        deleteTweet: (_, { id }, context) => {
            query.deleteData(context, 'tweet', id);
            return true;
        },
    }
};

module.exports = resolvers;