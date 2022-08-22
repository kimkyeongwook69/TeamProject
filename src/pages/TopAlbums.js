import React, { useEffect, useState } from "react";
import axios from "axios";

function TopAlbums ({token, searchId}) {
    const [TopAlbums, setTopAlbums] = useState([])
    const [ids, setIds] = useState([])
    useEffect(()=> {
        setIds(searchId)
    },[])
    let list = ''
    for(let i=0; i<=ids.length-1; i++) {
        // console.log(ids[i].id)
        list += ids[i].id + ','
    }
    // console.log(list)
    let listFix = list.substring(0, list.length - 1);
    console.log(listFix)

    const selectTopAlbums = async (e) => {
        e.preventDefault()
        // const {data} = await axios.get("https://api.spotify.com/v1/artists/"+{id}+"/top-tracks", {
        // const {data} = await axios.get("https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks", {
        const {data} = await axios.get("https://api.spotify.com/v1/albums", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        params: {
            ids: listFix,
            market: "ES",
            popularity: 20
        }
        })
        setTopAlbums(data);
        // console.log(data[0])
        console.log(TopAlbums)
        // console.log(data.tracks[0].album.name)
    }

    const renderTopAlbums = () => {
        // return TopAlbums.map(albums => (
        <div key={TopAlbums.id}>
            {/* {tracks.album.images ? <img width={"100%"} src={tracks.album.images[0].url} alt=""/> : <div>No Image</div>}
            {console.log(tracks.album.images[0])} */}
            {/* {TopAlbums.albums} */}
            {console.log(TopAlbums[0])}
        </div>
        // ))
    }
    return (
        <div>
            {token ?
                <form onSubmit={selectTopAlbums}>
                <button type={"submit"}>Top-Artists</button>
                </form>
            :
            <></>
            }
            {renderTopAlbums()}
        </div>
    )
}

export default TopAlbums