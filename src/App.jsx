import { useEffect, useState } from "react";
import image from "./assets/image-removebg-preview 1@2x.png";
import lock from "./assets/lock-svgrepo-com.svg";
import "./App.css";
import { useLocation } from "react-router-dom";
import GroupBox from "./Component/GroupBox";
import sendsvg from "./assets/send-svgrepo-com.svg";
import DialogueBox from "./Component/DialogueBox";
import NoteBox from "./Component/NoteBox";
import ProfileBar from "./Component/ProfileBar";

function App() {
  const [groupId, setGroupId] = useState(-1);
  const [groups, setgroups] = useState(() => {
    const savedGroups = localStorage.getItem("groups");
    return savedGroups ? JSON.parse(savedGroups) : [];
  });

  const [profile, setProfile] = useState({});

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [text, setText] = useState("");
  const [displayBox, setDisplayBox] = useState(false);
  const location = useLocation();
  const [groupSelected, setGroupSelected] = useState(-1);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (groupSelected !== -1 && groups.length > groupSelected) {
      setProfile({ ...groups[groupSelected] });
      const savedNotes = localStorage.getItem(`notes-${groupSelected}`);
      setNotes(savedNotes ? JSON.parse(savedNotes) : []);
    }
  }, [groupSelected, groups]);

  useEffect(() => {
    if (groupSelected !== -1) {
      localStorage.setItem(`notes-${groupSelected}`, JSON.stringify(notes));
    }
  }, [notes, groupSelected]);

  function handlesend() {
    if (text !== "") {
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const data = { text, day, month, year, time };
      if (notes.length == 0) {
        setNotes([data]);
      } else {
        setNotes([...notes, data]);
      }
    }
    setText("");
  }

  useEffect(()=>{
    if(groups.length > 0 && displayBox ){
      const group = groups[groups.length -1];
      setGroupId(group.id)
    }
  }, [displayBox])

  useEffect(() => {
    if (groups.length == 0 && location.state !== null) {
      setgroups([location.state]);
    } else {
      if (location.state !== null) {
        const groupexists = groups.some(
          (group) => group.id == location.state.id
        );
        if (!groupexists) {
          setgroups([...groups, location.state]);
        }
      }
    }
    setDisplayBox(false);
  }, [location]);

  return (
    <div class="MainContainer" >
      <div class={`OuterContainer ${displayBox ? "selected" : ""}`}>
        <div
          class={`GroupContainer ${groupSelected !== -1 ? "visibility" : ""}`}
        >
          <div class="heading">Pocket Notes</div>
          <div class="groups">
            {groups.length !== 0 ? (
              <div>
                {groups.map((group, index) => (
                  <GroupBox
                    key={index}
                    index={index}
                    data={group}
                    groupSelected={groupSelected}
                    setGroupSelected={setGroupSelected}
                  />
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <button class="addButton" onClick={(e) => setDisplayBox(true)}>
            +
          </button>
        </div>

        {groupSelected !== -1 ? (
          <div
            class={`NotesContainer ${groupSelected === -1 ? "visibility" : ""}`}
          >
            <ProfileBar
              data={profile}
              groupSelected={groupSelected}
              setGroupSelected={setGroupSelected}
            />
            <div class="NoteSection">
              {notes.length !== 0 ? (
                <div>
                  {notes.map((note, index) => (
                    <NoteBox key={index} data={note} />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div class="InputArea">
              <textarea
                id="textarea"
                placeholder="Enter your text here...."
                value={text}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handlesend();
                  }
                }}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <div class="sendsvg">
                <button onClick={handlesend}>
                  <img class="sendImg" src={sendsvg} alt="send button" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div class="MessageContainer">
            <div class="imageContainer">
              <img class="image" src={image} alt="image" />
            </div>
            <span>Pocket Notes</span>
            <p>
              Send and receive messages without keeping your phone online.
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div class="encryptionContainer">
              <div class="locksvgContainer">
                <img class="lock-svg" src={lock} alt="locksvg" />
              </div>
              <span>end-to-end encrypted</span>
            </div>
          </div>
        )}
      </div>
      {displayBox ? (
        <DialogueBox groupId={groupId} setGroupId={setGroupId} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
