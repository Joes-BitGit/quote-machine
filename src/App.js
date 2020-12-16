// Continue from user story #8
import React, { Component } from 'react'

window.API = {
  fetchRandomQuote() {
    return fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data =>
        data
        // console.log(`${data.content} —${data.author}`)
      )
      .catch((error) => {
        console.warn(error)
        return null
      });
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'LOADING'
    }
  }

  componentDidMount() {
    const terminator = `${this.state.text}...`;

    this.interval = window.setInterval(() => {
      this.state.text === terminator
        ? this.setState(() => ({ text: 'LOADING' }))
        : this.setState((prevState) => ({ text: prevState.text + '.' }))
    }, 100)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return (
      <h1>{this.state.text}</h1>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      loading: true,
    }
    this.fetchQuote = this.fetchQuote.bind(this);

  }

  componentDidMount() {
    console.log('--Mounting--');
    this.fetchQuote()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('--Updating--');
    console.log('prevState: ', prevState);
    console.log('prevProps: ', prevProps);
  }

  fetchQuote() {

    this.setState({
      loading: true
    })

    window.API.fetchRandomQuote()
      .then((data) => {
        // should update local state 
        console.log('API Call:', data);
        this.setState({
          quote: data.content,
          author: data.author,
          loading: false
        })
      })
  }


  render() {
    return (
      <div>
        <h1>Hello App!</h1>
        {this.state.loading === true
          ? <Loading />
          : <div id='quote-box'>
            <p id='text'>{this.state.quote}</p>
            <p id="author">{this.state.author}</p>
            <button><a href="http://www.twitter.com/" target="_blank" rel="noopener noreferrer" id='tweet-quote'>Twitter</a></button>
            <button id='new-quote' type='submit' onClick={this.fetchQuote}>New Quote</button>
          </div>
        }
      </div>
    )
  }
}

// We export the component as App to load it in index.js
// Its not mandatory but good practice
export default App