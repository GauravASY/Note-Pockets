import React, { useState } from "react";
import './DialogueBox.css'
import { useNavigate } from "react-router-dom";

function DialogueBox(props) {
  const [selectedColor, setSelectedColor] = useState("");
  const[groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  
  function handleClick(){
    if(selectedColor !== "" && groupName !== ""){
        let newGroupId = props.groupId + 1;
        props.setGroupId(newGroupId);
        console.log(newGroupId);
        navigate("/", {state : {color:selectedColor, groupName: groupName, id: newGroupId}});
    }
    else{
        navigate("/");
    }
  }

  return (
    <div class="DialogueBox">
        <div style={{ height: "100%" }}>
      <div class="heading box">
        Create New Group 
      </div>
      <div class="InputContainer box">
        <label htmlFor="GroupName">Group Name</label>
        <input type="text" name ="GroupName" placeholder="Enter group name" value={groupName} onChange={(e)=> setGroupName(e.target.value)}/>
      </div>
      <div class="ColorContainer box">
        <label>Choose colour</label>
        <div className="color-options">
          {[
            "#ff6666",
            "#ffcc66",
            "#66ff66",
            "#66ccff",
            "#6666ff",
            "#cc66ff",
          ].map((color) => (
            <button
              key={color}
              className={`color-button ${
                selectedColor === color ? "selectedCol" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
      <div class="buttonContainer box">
          <button onClick={handleClick}>Create</button>
      </div>
      </div>
    </div>
  );
}

export default DialogueBox;
