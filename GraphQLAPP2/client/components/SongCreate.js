import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router'
import query from '../queries/fetchSongs'

class SongCreate extends Component {

  constructor(props){
    super(props);

    this.state = { title: ''}
  }

  onFormSubmit(event){
    event.preventDefault()

    // this will return a promise
    this.props.mutate({
      variables: {title: this.state.title},
      // automatically refreshes the data with another request to our backend
      refetchQueries: [{ query: query }]
    }).then(() => {
      hashHistory.push('/')
    })
  }

  render(){
    return(
      <div>
        <Link to = '/'>
          Back
        </Link>
        <h3>Create a Song!</h3>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value})}
            value = {this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String){
    addSong(title: $title){
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
