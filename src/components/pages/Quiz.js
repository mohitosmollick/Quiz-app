import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useQuestions from "../../hooks/useQuestions";
import Answers from "../Answers";
import Miniplayer from "../Miniplayer";
import Progressbar from "../Progressbar";


const initialState = null;

const reducer = (state, action)=>{
    switch (action.type){
        
        case "questions":
            action.value.forEach((question)=>{
                question.options.forEach((option)=>{
                    option.checked = false;
                });
            });
            return action.value;
        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value;
             return questions;
        default:
            return state;
    }
};

export default function Quiz(){
    const {id} = useParams();
    const {questions, error, loading} = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [qua, dispatch] = useReducer(reducer, initialState);
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const videoTitle = location.state.videoTitle;
    

    useEffect(()=>{
        dispatch({
            type : "questions",
            value : questions,
        })
    },[questions]);

    function handleAnsChange(e, index){
        dispatch({
            type: "answer",
            questionID:currentQuestion,
            optionIndex:index,
            value : e.target.checked,
            
        })
    }

    // when click nesxt button to found next question
    function nextQuestion(){
        if(currentQuestion + 1 < questions.length){
            setCurrentQuestion((preCurrentQues)=> preCurrentQues +1)
        }
    }
    // when click nesxt button to found next question
    function previousQuestion(){
        if(currentQuestion >= 1 && currentQuestion <= questions.length){
            setCurrentQuestion((preCurrentQues)=> preCurrentQues -1)
        }
    }
    //submit quiz
    async function submit(){
        
        const {uid} = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);
        
        await set(resultRef,{
            [id] : qua,
        });
        
        navigate(
            `/result/${id}`,{
               state:{
                qua,
            } 
            }
         );
        
    }

    //calculate percentage
    const percentage = questions.length > 0 ? ((currentQuestion + 1) /questions.length) * 100 : 0;
    
    return (
        <>
        {loading && <div>Loading...</div> }
        {error && <div>have an error...</div> }
        {!loading && !error && qua && qua.length > 0 && (
        <>
        <h1>{qua[currentQuestion].title}
        {qua.length}</h1>
        <h4>Question can have multiple answers</h4>
        <Answers input options ={qua[currentQuestion].options} handleChange={handleAnsChange} />
        <Progressbar next = {nextQuestion} prev = {previousQuestion} submit={submit} progress ={percentage} />
        <Miniplayer videoTitle={videoTitle}  id={id}   />
        </>)}
        </>
    );
}