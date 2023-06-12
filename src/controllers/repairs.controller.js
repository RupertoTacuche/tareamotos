const Repair = require("../models/repair.models");
// inicio findAllRepair
exports.findAllRepair = async (req, res) => {
try {   
        const repairs = await Repair.findAll({
            where: {
                status: 'pending',
            },
        })
        return res.status(200).json({
            status: 'succes',
            repairs,
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
// final findAllRepair
// inicio del create
exports.create = async (req, res) => {
try {
    const { date, userId } = req.body;
    const repair = await Repair.create( {date, userId});


        return res.status(200).json({
            status: 'succes',
            repair, 
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

// fin del create
//inicio del findRepair
exports.findRepair = async (req, res) => {
try {   
        const { id } = req.params;
        const repair = await Repair.findOne({
           where: {
                id,
                status: 'pending',
           }, 
        });
        if(!repair){
            return res.status(404).json({
                status: 'error',
                message: `Repair with id: ${id} not found`,
            })
        }

        return res.status(200).json({
            status: 'succes',
            repair,
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
//fin del findrepair
     
//inicio del update
exports.update = async (req, res) => {
try {
        const { id } = req.params;
        const { status } = req.body;

        const repair = await Repair.findOne({
            where: {
                id,
                status: 'pending'
            }
        })

        if(!repair) {
            return res.status(404).json({
                status: 'error',
                message: `repair with id: ${id} not found`
            })
        }
        await repair.update({ status })

        return res.status(200).json({
            status: 'succes',
            message: 'repair updated',
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
//fin del update

//inicio del delete
exports.delete = async (req, res) => {
    try {
            const { id } = req.params;
            
    
            const repair = await Repair.findOne({
                where: {
                    id,
                    status: 'pending',
                }
            })
    
            if(!repair) {
                return res.status(404).json({
                    status: 'error',
                    message: `repair with id: ${id} not found`
                })
            }
            await repair.update({ status: 'cancelled' })
    
            return res.status(200).json({
                status: 'succes',
                message: 'repair deleted',
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

//fin del delete