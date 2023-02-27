const {
    create,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    getUserByUserEmail,
    updateProfile
} = require("../service/user/user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
    createUser: async(req, res) => {
        try{
            const body = req.body;
            if(body.password) {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
            }
        
            const affectedRows = await create(body);
        
            if(affectedRows > 0) {
                return res.status(200).json({
                    success: 1,
                    message: "Record Added Successfully."
                });
            }else{
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error."
                });
            }

        }catch(e) {
            return res.json({
                success: 0,
                message: e.message,
            });
        }
       

    },
    getUserByUserId: async(req, res) => {
        try{

            const id = req.params.id;
            const results = await getUserByUserId(id);
           
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
       
        }catch(e){
            return res.json({
                success: 0,
                message: e.message,
            });
        }
        
    },
    getUsers: async(req, res) => {
        try{
            const results = await getUsers();
            return res.json({
                        success: 1,
                        data: results
                    });
        }catch(e){
            return res.json({
                success: 0,
                message: e.message,
            });
        }
    },
    updateUser: async(req, res) => {
        try{
            const body = req.body;
            if(body.password) {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
            }
         
           const affectedRows = await updateUser(body); 
            if(affectedRows > 0) {
                return res.json({
                    success: 1,
                    message: "updated successfully"
                });
            }else{
                return res.json({
                    success: 0,
                    message: "Failed to update"
                });
            }

    
        }catch(e){
            return res.json({
                success: 0,
                message: e.message,
            });
        }
            },
    deleteUser: async(req, res) => {
        try{
            const data = req.body;
            const affectedRows = await deleteUser(data);
                if (err) {
                    console.log(err);
                    return;
                }
                if (affectedRows > 0) {
                    return res.json({
                        success: 1,
                        message: "user deleted successfully"
                    });
                }else{
                    return res.json({
                        success: 0,
                        message: "Record Not Found"
                    });
                }
        }catch(e){
            return res.json({
                success: 0,
                message: e.message
            });
        }
       
            
       
    },

    login: async(req, res) => {
        try{
            const body = req.body;
            const results = await getUserByUserEmail(body.email);
               
                if(results) {
                    const result = compareSync(body.password, results.password);
                    if (result) {
                        results.password = undefined;
                        const jsontoken = sign({ result: results }, "qwe1234", {
                            expiresIn: "1h"
                        });

                        return res.json({
                            success: 1,
                            message: "login successfully",
                            token: jsontoken
                        });
                    } 
                }else {
                    return res.json({
                        success: 0,
                        data: "Invalid email or password"
                    });
                }
            
        }catch(e) {
            return res.json({
                success: 0,
                data: e.message
            });
        }
    },

    updateProfile: async (req, res) => {
       try{

        let filename = req.file.filename;
        data = {
         id : req.body.id,
         file : filename
        }
     
       const affectedRows = await updateProfile (data);
         if (affectedRows > 0) {
            return res.json({
                success: 1,
                profile_url: `http://localhost:3000/${req.file.path}`
            });
         }else{
            return res.json({
                success: 0,
                message: "Error updating profile"
            });
         }
       }catch(e) {
        return res.json({
            success: 0,
            message: e.message
        });
       }
      
       
    }
}