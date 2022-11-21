import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswer(videoID){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);


    useEffect(()=>{
        async function fetchAnswer(){
            const db = getDatabase()
            const answerRef = ref(db, "answers/"+videoID+"/questions" );
            const answerQuery = query(
                answerRef,
                orderByKey()
            );

            try{
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(answerQuery);
                setLoading(false);
                if(snapshot.exists()){
                    setAnswers((prevanswers)=>{
                        return [...prevanswers, ...Object.values(snapshot.val())]
                    });
                }

            }catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
            }
            
        }
        fetchAnswer();

    },[videoID])

    return {
        answers,
        error,
        loading,
    };
}