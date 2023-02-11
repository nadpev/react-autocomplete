import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import './custom.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const loadCharacters = async () => {
      const response = await axios.get(
        'https://rickandmortyapi.com/api/character'
      )
      setCharacters(response.data.results)
    }
    loadCharacters()
  }, [])
  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
  }

  const onChangeHandler = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = characters.filter((chr) => {
        const regex = new RegExp(`${text}`, 'gi')
        return chr.name.match(regex)
      })
    }
    console.log('matches', matches)
    setSuggestions(matches)
    setText(text)
  }

  return (
    <div className='App'>
      <h1>Custom React AutoComplete</h1>
      <div className='auto-container'>
        <input
          type='text'
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([])
            }, 100)
          }}
        />
        {suggestions &&
          suggestions.map((suggestion) => (
            <div
              className='suggestion'
              key={suggestion.name}
              onClick={() => onSuggestHandler(suggestion.name)}>
              {suggestion.name}
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
