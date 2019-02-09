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

        try {
            await context.mysqlClient.connect();
        } catch (e) {
            console.log('Database Connection failed:' + e);
        }

        context.mysqlClient
            .query(`SELECT * from ${table} where id = ${id}`, (err, rows) => {
                if (!err) {
                    context.mysqlClient.end();
                    resolve(rows[0]);
                } else {
                    context.mysqlClient.end();
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

module.exports = {
    getAllFromTable,
    getDataById,
    insertData,
    deleteData
}