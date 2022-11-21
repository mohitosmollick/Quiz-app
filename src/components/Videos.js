import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Video from "../components/Video";
import useVideos from "../hooks/useVideos";



export default function Videos(){
    const [ page, setPage] = useState(1);
    const {loading, videos, error, hasmore} = useVideos(page);
    
    return (
        <div>  
           {videos.length > 0 && (
               <InfiniteScroll dataLength={videos.length} hasMore={hasmore} next={()=>setPage(page+4)}>

                {videos.map((video)=> video.noq > 0 ? (
                    <Link to={`quiz/${video.youtubeID}`} state={{videoTitle:video.title}} key={video.youtubeID}>
                        <Video
                         title={video.title} id={video.youtubeID} noq={video.noq} 
                         />
                </Link>
                ) : (
                    <Video title={video.title} id={video.youtubeID} noq={video.noq} key={video.youtubeID}/>
                )
                )} 
               </InfiniteScroll>
           )}
           
           {!loading && videos.length === 0 && <div>No data found</div>}
           {error && <div>found an error!</div>}
           {loading && <div>Loading...</div>}

        </div>
    )
}