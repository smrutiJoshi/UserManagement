const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        console.log(data.contact);
        pool.query(
            `insert into registration(firstName,lastName,gender,email,password,contact)
            values(?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.contact
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    getUsers: callback => {
        pool.query(
            `select id, firstName,lastName,gender,email,password,contact from registration`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },

    getUserByUserId: (id,callback) => {
        pool.query(
            `select id, firstName,lastName,gender,email,password,contact from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        );
    },
    updateUser: (data, callback) => {
        console.log(data.id);
        pool.query(
            `update registration set firstName=?,lastName=?,gender=?,email=?,password=?,contact=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.contact,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results.affectedRows)
            }
        );
    },

    deleteUser: (data, callback) => {
        pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },

    getUserByUserEmail: (email, callback) => {
        pool.query(
          `select * from registration where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
                callback(error);
            }
            return callback(null, results[0]);
          }
        );
      },

      updateProfile : (data, callback) => {
        pool.query(
            `update registration set profile= ? where id=?`,
            [
                data.file,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }

        )
      }
};