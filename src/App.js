// Continue from user story #8
import React, { Component } from 'react'

window.API = {
  fetchRandomQuote() {
    return fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data =>
        data
      )
      .catch((error) => {
        console.warn(error)
        return null
      });
  }
}

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'LOADING'
    }
  }

  componentDidMount() {
    const terminator = `${this.state.text}..`;

    this.interval = window.setInterval(() => {
      this.state.text === terminator
        ? this.setState(() => ({ text: 'LOADING' }))
        : this.setState((prevState) => ({ text: prevState.text + '.' }))
    }, 350)
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
    this.fetchQuote()
  }


  fetchQuote() {
    // start loading
    this.setState({
      loading: true
    })
    // call global function returns a promise, hence .then callback
    window.API.fetchRandomQuote()
      .then((data) => {
        // should update local state 
        this.setState({
          quote: data.content,
          author: data.author,
          loading: false
        })
      })

    // grabs a hex color from the function
    // sets the background
    // this will happen every time the app component renders
    let hexColor = getRandomColor();
    document.body.style.backgroundColor = hexColor;
  }


  render() {

    return (
      <main className='parent'>
        <h1>Hello Quote Machine!</h1>

        {this.state.loading === true
          ? <Loading />
          :
          <div id='quote-box'>
            <p id='text'>{this.state.quote}</p>
            <p id="author">{this.state.author}</p>
            <button>
              <a href={`http://www.twitter.com/intent/tweet?text=${this.state.quote}%20-${this.state.author}&hashtags=quotes`} target="_blank" rel="noopener noreferrer" id='tweet-quote'>Tweet</a>
            </button>

            <button id='new-quote' type='submit' onClick={this.fetchQuote}>New Quote</button>

          </div>

        }
      </main>
    )
  }
}

// random color generator
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

function getRandomColor() {
  let hexColor = '#';
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  return hexColor;
}

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}

// We export the component as App to load it in index.js
// Its not mandatory but good practice
export default App