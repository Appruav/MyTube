const {Video}=require("../model/schema");
const fetchvidoes=async(req,res)=>{
    try{
        const video=await Video.find();  
        console.log(video); 
       return res.status(200).json({data:video})
    }catch(err){
    console.error("Error fetching videos:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
    }
}
const uplaodvideo=async(req,res)=>{
    try{
        const { originalname,path}=req.file;
        console.log('req.file:', req.file);
        const finsifvideoexists=Video.find({name:originalname});
        if(finsifvideoexists){
            return res.status(400).json({message:"Vidoe already exists"});
        }
        const video=new Video({name:originalname,path:path});
        await video.save();
       return res.status(200).json({message:"File Uploaded"})
    }catch(err){console.log(err);}
}
module.exports={fetchvidoes,uplaodvideo}