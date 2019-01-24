import React from 'react'
import axios from 'axios'

class AddNoteForm extends React.Component {
  constructor(props) {
    super(props)

    this.props = props
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  async handleSubmit(e) {
    e.preventDefault()

    let note = (await axios.post("api/notes", {
      article: this.props._id,
      body: this.state.value
    })).data

    this.props.app.setState(state => ({notes: {...state.notes, ...{[note._id]: note}}}))
    this.setState({value: ''})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Add Note" />
      </form>
    )
  }
}

export default AddNoteForm