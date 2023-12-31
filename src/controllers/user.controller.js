const User = require("../models/user.models");

exports.findAllUsers = async(req, res) => {
    try{
        //aqui va toda la logica
        const users = await User.findAll({
            where: {
                status: 'available',
            },
        });

        return res.status(200).json({
            status:'success ',
            users,
        });

    } catch (error){
        console.log(error);
        return res.status(500).json({
            status:'fail',
            message: 'Something went very wrong 😡',
        });
    }
};
exports.createUser = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        const user = await User.create({ name, email, password, role });

        return res.status(200).json({
            status:'success ',
            user, 
        });
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            status:'fail',
            message: 'Something went very wrong 😡',
        });
    }
};

// findUser
exports.findUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id,
                status: 'available',
            },
        });

        if(!user){
            return res.status(404).json({
                status: 'error',
                message: `User with id: ${id} not found`,
            });
        }

        return res.status(200).json({
            status: 'success',
            user,
        })
        
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            status:'fail',
            message: 'Something went very wrong 😡',
        });
    }
}

// final de find user

//inicio de update
exports.update = async (req, res) => {
    try {
        const { id }= req.params;
        const { name, email } = req.body;

        const user = await User.findOne({
            where: {
                id, 
                status: 'available',
            },
        });

        if(!user){
            return res.status(404).json({
                status: 'error',
                message: `User with id: ${id} not found`,
            });
        }
        
        await user.update({name, email});
        return res.status(200).json({
            status: 'success',
            message: 'user updated',
        });
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            status:'fail',
            message: 'Something went very wrong 😡',
        });
    }
}

//final de update
// inicio delete
exports.delete = async (req, res) => {
    try {
        const { id }= req.params;
        const { name, email } = req.body;

        const user = await User.findOne({
            where: {
                id, 
                status: 'available',
            },
        });

        if(!user){
            return res.status(404).json({
                status: 'error',
                message: `User with id: ${id} not found`,
            });
        }
        
        await user.update({status: 'disabled'});
         
        return res.status(200).json({
            status: 'success',
            message: 'user deleted',
        });
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            status:'fail',
            message: 'Something went very wrong 😡',
        });
    }
}
//fin delete
