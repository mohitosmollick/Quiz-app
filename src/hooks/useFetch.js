
import { useEffect, useState } from "react";

export default function useFetch(url, method, headers){
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(()=>{
        async function requestFecth(){
            try{
                setLoading(true);
                setError(false);
                const responce = await fetch(url, {
                    method: method || "GET",
                    headers: headers,
                });
                const data = await responce.json();
                setLoading(false);
                setResult(data);
            }catch(err){
                console.log(err);
                setLoading(false);
                setError(true);
                
            }
        }
        requestFecth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return{
        loading,
        error,
        result
    }
}