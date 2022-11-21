import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";


export default function LoginForms(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] =useState();
    const [loading, setLoading] = useState();

    const navigate = useNavigate();
    const {singin} = useAuth();

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            setError("");
            setLoading(true);
            await singin(email,password);
            navigate("/");
        }catch(err){
            console.log(err);
            setLoading(false);
            setError("Failed to Login!");

        }
    }
    return (
        <Form style={{height: "330px"}} onSubmit={handleSubmit}>
            
            <TextInput type="text" placeholder="Enter email" icon="alternate_email" required value={email} onChange={(e)=>setEmail(e.target.value)} />

            <TextInput type="password" placeholder="Enter password" icon="lock" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
            
            <Button type="submit" disabled={loading}><span>Submit Now</span></Button>
            {error && <p className="error">{error}</p>}
            <div class="info">Don't have an account? <a href="signup.html">Sign In</a> instead.</div>
        </Form>
    );
}