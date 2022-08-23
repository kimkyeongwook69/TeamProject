import React, { useEffect, useState } from "react";
import axios from "axios";

function TopAlbums ({token, searchId, newRelease}) {
    const [topAlbums, setTopAlbums] = useState([newRelease])
    useEffect(() => {
        setTopAlbums(searchId)
    }, [searchId])

    let list = ''
    for(let i=0; i<=searchId.length-1; i++) {
        list += searchId[i].id + ','
    }
    let listFix = list.substring(0, list.length - 1);

    const selectTopAlbums = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/albums", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        params: {
            ids: listFix,
            market: "ES"
        }
        })

        const dataFix = [...data.albums].sort((data1, data2) => data2.popularity - data1.popularity); // 된다!
        setTopAlbums(dataFix);
    }
    
    return (
        <div>
            {token ?
                <form onSubmit={selectTopAlbums}>
                <button type={"submit"}>PopularAlbum</button>
                </form>
                :
                <></>
            }
            {topAlbums.map(album => (
                <div key={album.id}>
                    {album.images ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
                    {/* {console.log(album)} */}
                    {album.name}
                    {album.popularity}
                </div>
            ))}
        </div>
    )
}

export default TopAlbums