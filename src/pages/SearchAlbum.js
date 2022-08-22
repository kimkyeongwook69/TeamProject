import React, { useState } from "react";
import axios from "axios";
import TopArtist from "./TopAlbums";

function Search ({token}) {
    const [searchKey, setSearchKey] = useState("")
    const [albums, setalbums] = useState([])

    const searchalbums = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "album"
            }
        })
    
        setalbums(data.albums.items)
    
        console.log(data)
    }
    
    const renderalbums = () => {
      return albums.map(album => (
          <div key={album.id}>
              {album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
              {album.name}
          </div>
      ))
    }
    return(
        <div>
            {token ?
                <form onSubmit={searchalbums}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <button type={"submit"}>Search</button>
                </form>
                : <h2>Please Login</h2>
            }
        
            {renderalbums()}
            <TopArtist value="albums.id"></TopArtist>
        </div>
    )
}


export default Search