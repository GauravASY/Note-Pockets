import React, { useState, useEffect } from 'react'
import './NoteBox.css'
import dot from "../assets/dot-small-svgrepo-com.svg"

function NoteBox(props) {
    const {day, month, year, time} = props.data;

    

  return (
    <div class="TextContainer">
        <div class="Content">{props.data.text}</div>
        <div class="DateTime">
            <div class="box">{`${day} ${month} ${year}`}</div>
            <div style={{
                height : "30px",
                width : "30px",
                objectFit : "cover"
            }}>
                <img style={{height: "100%", width: "100%"}} src={dot} alt="" />
            </div>
            <div style={{marginRight:"8px"}}> {time} </div>
        </div>
    </div>
  )
}

export default NoteBox