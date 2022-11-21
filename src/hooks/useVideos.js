import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideos(page){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasmore, setHasmore] = useState(true);

    useEffect(()=>{
        async function fetchVideos(){
            const db = getDatabase()
            const videosRef = ref(db, "videos");
            const videoQuery = query(
                videosRef,
                orderByKey(),
                startAt("" + page),
                limitToFirst(4)
            );

            try{
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(videoQuery);
                setLoading(false);
                if(snapshot.exists()){
                    setVideos((prevVideos)=>{
                        return [...prevVideos, ...Object.values(snapshot.val())]
                    });
                }else{
                    setHasmore(false);
                }

            }catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
            }
            
        }
        fetchVideos();

    },[page])

    return {
        videos,
        error,
        loading,
        hasmore,
    };
}