"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
interface Video {
  _id: string;
  name: string;
  path: string;
  createdAt: string;
  __v: number;
}
export default function Home() {

const [displayVideos, setDisplayVideos] = useState<Video[]>([]);

  const [video, setvideo] = useState<File | undefined>(undefined);
  useEffect(()=>{
    const fetchvideos=async()=>{
      try{
        const res=await axios.get("http://localhost:8000/api/fetch-videos");
        // console.log(res.data.data);
             
        setDisplayVideos((prevVideos) => [...prevVideos, ...res.data.data ]);
      }catch(err){console.log(err);
      }
    }
    fetchvideos();
  },[])
  useEffect(() => {
    console.log(displayVideos); // Log the updated state after re-render
  }, [displayVideos]);
  const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log('Selected file:', e.target.files[0]); 
      setvideo(e.target.files[0]);
    } 

  }

  const uplaodvideo=async()=>{
    if (video) {
      const formData = new FormData();
      formData.append("video", video);
      try {
        const res=await axios.post("http://localhost:8000/api/upload-video", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(res.status==400){
          console.log("Video Already Uploaded");
          
        }
      } catch (err) {
        console.error("Error uploading video:", err);
      }
    } else {
      console.error("No video selected");
    }
  }
  return (
   <div>
    <input type="file" onChange={handlechange}/>
    <button type="submit" onClick={uplaodvideo}>Upload</button>

    {displayVideos.map((video:any)=>(
      <div key={video._id}>
        <h2>{video.name}</h2>
        <video src={`http://localhost:8000/${video.path}`} controls></video>
          </div>
    ))}
   </div>
  );
}
