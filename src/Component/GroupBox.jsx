import React, { useEffect, useState } from 'react'
import './GroupBox.css'

function GroupBox(props) {
  const[picName, setPicName] = useState("");

  useEffect(()=>{
    const words = props.data.groupName.split(" ");
    if(words.length == 1){
      setPicName(words[0].charAt(0));
    }
    else{
      let ch1 = words[0].charAt(0);
      let ch2 = words[1].charAt(0);
      setPicName(ch1.toUpperCase() + ch2.toUpperCase());
    }
  },[])

  return (
    <div class={`GroupBoxContainer ${props.groupSelected === props.index ? "onSelection" : ""}`} onClick={()=> props.setGroupSelected(props.index)} >
        <div class="profilePic" style={{backgroundColor: `${props.data.color}`}}>{picName}</div>
        <div class="name">{props.data.groupName}</div>
    </div>
  )
}

export default GroupBox