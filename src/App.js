import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE} from './config'
import Search from './component/Search';
import TopArtist from './component/TopArtists';
import NewReleaseAlbum from './component/NewReleaseAlbum';

// npm install axios

// spotify API Reference
// https://developer.spotify.com/documentation/web-api/reference/#/
// How to use the Spotify API In Your React JS App
// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn


function App() {
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      
      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }
    
    setToken(token)
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ?
                      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                          to Spotify</a>
                      : <button onClick={logout}>Logout</button>}
      <Search token={token}/>
      <TopArtist token={token} />
    </header>
    <main>
      <NewReleaseAlbum token={token} />
    </main>
    </div>
  );
}

export default App;