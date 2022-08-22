import React, { useState } from "react";
import axios from "axios";

function TopArtist ({token}) {
    const [topArtists, setTopArtists] = useState([])

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
            {tracks.album.images ? <img width={"100%"} src={tracks.album.images[0].url} alt=""/> : <div>No Image</div>}
            {console.log(tracks.album.images[0])}
            {tracks.name}
          </div>
        ))
      }
    return (
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
    )
}

export default TopArtist