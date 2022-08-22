import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

// npm install axios

// spotify API Reference
// https://developer.spotify.com/documentation/web-api/reference/#/
// How to use the Spotify API In Your React JS App
// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

function App() {
const CLIENT_ID = "4309352159504a81b378691b675fd78f"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const [token, setToken] = useState("")

const [searchKey, setSearchKey] = useState("")
const [artists, setArtists] = useState([])

const [newAlbums, setNewAlbums] = useState([])
const [topArtists, setTopArtists] = useState([])


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

const searchArtists = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "artist"
      }
  })

  setArtists(data.artists.items)

  console.log(data)
}

const renderArtists = () => {
  return artists.map(artist => (
      <div key={artist.id}>
          {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          {artist.name}
      </div>
  ))
}
// popularity

const selectTopArtists = async (e) => {
  e.preventDefault()
  // const {data} = await axios.get("https://api.spotify.com/v1/artists/"+{id}+"/top-tracks", {
  const {data} = await axios.get("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    params: {
      market: "ES"
    }
  })
  setTopArtists(data.tracks);
  console.log(data.tracks)
  // console.log(data.tracks[0].album.name)
}

const renderTopArtists = () => {
  return topArtists.map(tracks => (
    <div key={tracks.id}>
      {tracks.album.images ? <img width={"30%"} src={tracks.album.images[0].url} alt=""/> : <div>No Image</div>}
      {console.log(tracks.album.images[0])}
      {tracks.name}
    </div>
  ))
}

// useEffect(() => {
//   async function newReleaseAlbum() {
//     const response = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json" 
//       }
//     })
//     setNewAlbums(response.data.albums.items);
//   }
//   newReleaseAlbum() 
// },[token])

  return (
    <div className="App">
      <header className="App-header">
      <h1>Spotify React</h1>
      {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
      {token ?
        <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"}>Search</button>
        </form>
        : <h2>Please Login</h2>
      }

    {renderArtists()}
    <div>
      {token ?
        <form onSubmit={selectTopArtists}>
          <button type={"submit"}>Top-Artists</button>
        </form>
      :
      <></>
      }
      {renderTopArtists()}
    </div>
    </header>
    <main>
      {/* {token ?
        (<div>
          {newAlbums.map(album => (
            <div key={album.id}>
              {album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
              {album.name}
            </div>
          ))}
        </div>)
      :(<></>)} */}
    </main>
    </div>
  );
}

export default App;