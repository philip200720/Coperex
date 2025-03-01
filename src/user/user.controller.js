import { hash, verify } from "argon2";
import User from "./user.model.js"

export const getUsers = async (req, res) => {
    try{
        const query = { status: true }

        const users = await User.find(query)

        return res.status(200).json({
            success: true,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error getting users",
            error: err.message
        })
    }
}

export const getUserById = async (req, res) => {
    try {
      const { uid } = req.params;
      const user = await User.findById(uid)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      return res.status(200).json({
        success: true,
        user
      });
  
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error getting user",
        error: err.message
      })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { usuario } = req
        const { role } = usuario
        const data = req.body

        if(role === "ADMIN_ROLE"){
            if(data.uid){
                const { uid } = data
                const user = await User.findById(uid)
                if(user.role === "ADMIN_ROLE"){
                    return res.status(401).json({
                        success: false,
                        message: "Unable to delete other admins"
                    })
                }else if(user.role === "USER_ROLE"){
                    const user = await User.findByIdAndUpdate(uid, {status:false}, { new: true})
                     return res.status(200).json({
                        success: true,
                        message: "User deleted successfully",
                        user
                    })
                }
            }
            const user = await User.findByIdAndUpdate(usuario._id, {status:false}, { new: true})
            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user
            })
        }else if(role === "USER_ROLE"){
            if(data.uid){
                return res.status(401).json({
                    success: false,
                    message: "Only admins are authorized to delete other users"
                })
            }
            const user = await User.findByIdAndUpdate(usuario.uid, {status: false}, {new: true})

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
                user
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error deleting users",
            error: err.message
        })
    }
}

export const createDefaultAdmin = async () => {
    try {
      const adminExists = await User.findOne({ role: "ADMIN_ROLE" });
      if (!adminExists) {
        const defaultAdmin = {
          name: "admin",
          surname: "123",
          username: "admin123",
          email: "admin123@example.com",
          password: await hash("Abcd1234."),
          role: "ADMIN_ROLE",
          status: true,
        };
        await User.create(defaultAdmin);
        console.log("Default admin created");
      }
    } catch (error) {
      console.error(`"Error creating default admin:", ${error}`);
    }
};