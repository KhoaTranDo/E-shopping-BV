import React,{useState,useEffect} from "react";

function Count(){
    const [count,setCount]=useState(0)
    useEffect(()=>{
        console.log(count)
    })
    return(
        <>
        <button onClick={setCount(count+1)}>+</button>
        <p>{count}</p>
        <button onClick={setCount(count-1)}>-</button>
        </>
    )
}
export default Count()