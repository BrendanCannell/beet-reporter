import React, { Component } from 'react'
import axios from 'axios'
import Article from "../Article"
import u from "../util"

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      articles: {},
      notes: {},
      populatedArticles() {
        let populated = {...this.articles}

        Object.keys(populated)
          .map(_id => populated[_id].notes = [])

        Object.values(this.notes)
          .forEach(n => populated[n.article].notes.push(n))

        return populated
      }
    }

    axios.get("api")
      .then(res => this.setState({
        articles: u.indexBy('_id')(res.data.articles),
        notes: u.indexBy('_id')(res.data.notes)
      }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <ul>
          {Object.values(this.state.populatedArticles())
              .map(a =>
              <li key={a._id}>
                <Article app={this} {...a} />
              </li>)}
        </ul>
      </div>
    )
  }
}

export default App;
