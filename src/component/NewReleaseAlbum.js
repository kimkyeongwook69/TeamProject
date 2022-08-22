import React, { useEffect, useState } from "react";
import axios from "axios";

function NewReleaseAlbum({token}) {
    const [newAlbums, setNewAlbums] = useState([])

    useEffect(() => {
        async function newReleaseAlbum() {
          const response = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json" 
            }
          })
          setNewAlbums(response.data.albums.items);
        }
        newReleaseAlbum() 
      },[token])
    return(
        <div>
            {token ?
                (<div>
                {newAlbums.map(album => (
                    <div key={album.id}>
                    {album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
                    {album.name}
                    </div>
                ))}
                </div>)
                :(<></>)}
        </div>
    )
}

export default NewReleaseAlbum