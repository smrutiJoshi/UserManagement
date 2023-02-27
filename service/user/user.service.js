const pool = require("../../config/database");

module.exports = {
    create: async(data) => {
        return new Promise((resolve,reject) => {
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
                        return reject(error)
                    }
                    return resolve(results.affectedRows)
                }
            )
        });
      
    },
    getUsers: async() => {
        return new Promise((resolve,reject)=>{
            pool.query(
                `select id, firstName,lastName,gender,email,password,contact from registration`,
                [],
                (error, results, fields) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results)
                }
            );
        })
        
    },

    getUserByUserId: async(id) => {
        return new Promise((resolve,reject) => {
            pool.query(
                `select id, firstName,lastName,gender,email,password,contact from registration where id = ?`,
                [id],
                (error, results, fields) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results[0])
                }
            );
        })
        
    },
    updateUser: async (data) => {
      return new Promise((resolve, reject)=> {
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
                    return reject(error)
                }
                return resolve(results.affectedRows)
            }
        );
      })
        
    },

    deleteUser: async(data) => {
        return new Promise((resolve, reject)=> {
            pool.query(
                `delete from registration where id = ?`,
                [data.id],
                (error, results, fields) => {
                    if (error) {
                        return reject(error)
                    }
                    console.log(results);
                    return resolve(results.affectedRows)
                }
            )
        });
        
    },

    getUserByUserEmail: async(email) => {
        console.log(email);
        return new Promise((resolve,reject) => {
            pool.query(
                `select * from registration where email = ?`,
                [email],
                (error, results, fields) => {
                  if (error) {
                      return reject(error);
                  }
                  return resolve(results[0]);
                }
              );
        }); 
      },

      updateProfile : async(data) => {
        return new Promise((resolve,reject)=>{
            pool.query(
                `update registration set profile= ? where id=?`,
                [
                    data.file,
                    data.id
                ],
                (error, results, fields) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve(results.affectedRows)
                }
    
            )
        });
      }
};