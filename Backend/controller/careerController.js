const Career = require('../model/careerModel')

const addCareer = async(req,res)=>{
    try {
        const career = req.body;
        const newCareer = new Career(career);
        await newCareer.save();
        return res.status(200).json({success: true,message:'Your application form has been submitted successfully',newCareer})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false,message:'Internal server error'})
    }
}

const getAllCareer = async(req,res)=>{
    try {
        const career = await Career.find().sort({_id:-1});
        return res.status(200).json({message:'Career fetched successfully',career})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error'})
    }
}

const deleteCareer = async(req,res)=>{
    try {
            const {id} = req.params;
    if(!id){
        return res.status(401).json({success: false,message:'Id is required'})
    }
    const career = await Career.findByIdAndDelete(id)
    return res.status(200).json({success: true,message:'Career is deleted successfully',career})
    } catch (error) {
        console.log(error);
        return res.status.json({success: false,message:'Internal server error'})
    }
}

module.exports = {
    addCareer,
    getAllCareer,
    deleteCareer
}