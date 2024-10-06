import React, { useEffect, useState } from 'react'
import backarrow from "../assets/Vector.png"

function ProfileBar(props) {
    const[picName, setPicName] = useState("");

    useEffect(()=>{
      if(props.data.groupName){
      const words = props.data.groupName.split(" ");
      if(words.length == 1){
        setPicName(words[0].charAt(0));
      }
      else{
        let ch1 = words[0].charAt(0);
        let ch2 = words[1].charAt(0);
        setPicName(ch1.toUpperCase() + ch2.toUpperCase());
      }
    }
    },[props.data])

  return (
        <div class="ProfileBar">
            <button class="BackArrow"><img src={backarrow} alt="goback" onClick={()=>props.setGroupSelected(-1)}/></button>
            <div class="profilePic" style={{backgroundColor: `${props.data.color}`, marginLeft : "1em"}}>{picName}</div>
            <div style={{marginLeft : "20px", color: "white"}} class="name">{props.data.groupName}</div>
        </div>
    
  )
}

export default ProfileBar