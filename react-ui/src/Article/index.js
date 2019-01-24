import React from 'react'
import Note from "../Note"
import AddNoteForm from "../AddNoteForm"

let articleStyle = {
  textAlign: "left",
  border: "solid 1px black",
  margin: "1em",
  padding: "1em"
}

let headingStyle = {
  fontSize: "2em",
}

let titleStyle = {
  marginLeft: "0.5em"
}

let notesItemStyle = {
  margin: "1em",
}

let Article = ps =>
  <div className="Article" key={ps._id} style={articleStyle}>
    <div style={headingStyle}>
      <span>{ps.date.slice(0,10)}</span>
      <a href={ps.link} style={titleStyle}>{ps.title}</a>
    </div>
    {ps.notes.length > 0
     &&
     <ul>
       {ps.notes.map(n =>
         <li key={n._id} style={notesItemStyle}>
           <Note app={ps.app} {...n} />
         </li>)}
     </ul>}
    <AddNoteForm app={ps.app} _id={ps._id}/>
  </div>

export default Article