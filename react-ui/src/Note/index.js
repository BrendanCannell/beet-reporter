import React from 'react'
import axios from 'axios'
import u from "../util"

let deleteStyle = {
  color: "red",
  marginRight: "0.5em"
}

export default class Note extends React.Component {
  constructor(props) {
    super(props)

    this.props = props

    this.state = {
      body: this.props.body,
      active: false,
      justActivated: false
    }

    this.ref = React.createRef()

    this.deleteButton = 
      <button
        className="delete"
        style={deleteStyle}
        onClick={() =>
          axios.delete("api/notes/" + this.props._id)
            .then(() => this.props.app.setState({
              notes: u.filterObj(_id => _id !== this.props._id)(this.props.app.state.notes)
            }))
            .catch((e) => console.log(e))}
      >
        X
      </button>

    this.submitEdit = this.submitEdit.bind(this)
  }

  submitEdit(e) {
    this.setState({active: false})

    if (this.props.body === this.state.body) return

    let notes = this.props.app.state.notes,
        oldNote = notes[this.props._id],
        newNote = {...oldNote, body: this.state.body}

    this.props.app.setState({
      notes: {...notes, [this.props._id]: newNote}
    })

    axios.put("api/notes/" + this.props._id, {
      body: this.state.body
    }).catch(e => console.log(e))
  }

  componentDidUpdate() {
    if (this.state.active && this.state.justActivated) {
      this.ref.current.focus()
      this.ref.current.setSelectionRange(this.state.body.length, this.state.body.length)
      this.setState({justActivated: false})
    }
  }

  render() {
    let ENTER = 13, ESC = 27

    let body = this.state.active
      ? <input
          type="text"
          value={this.state.body}
          onChange={e => this.setState({body: e.target.value})}
          onBlur={e => this.submitEdit(e)}
          onKeyUp={e => [ENTER, ESC].includes(e.keyCode) && e.target.blur()}
          ref={this.ref}
        />
      : <span
          onClick={e => {
            this.setState({active: true, justActivated: true})
            e.target.focus()
          }}
        >
          {this.state.body}
        </span>

    return (
      <div className="Note" key={this.props._id}>
        {this.deleteButton}
        {body}
      </div>
    )
  }
}