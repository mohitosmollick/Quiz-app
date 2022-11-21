import Illustration from "../Illustration";
import LoginForms from "../LoginForms";

export default function Login(){
    return(
        <>
        <h1>Create an account</h1>
        <div class ="column">
            <Illustration/>
            <LoginForms/>
        </div>
        </>
    );
}