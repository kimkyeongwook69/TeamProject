import '../App.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";

const PopularAlbumsWrap = styled.div`
  width: calc(100% - 300px);
  padding: 15px;
  padding-top: 0px;
`

const PopularAlbumList = styled.div`
  display: flex;
  padding: 1.25%;
  flex-wrap: wrap;
  border-top: 1px solid lightgray;
  margin-top: 12px;
`

const PopularAlbum = styled.div`
  width: 32.5%;
  padding: 15px;
  text-align: center;
  & img{
    margin-bottom: 10px;
  }
`
function PopularAlbums({token}){
    const [newAlbums, setNewAlbums] = useState([]);

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


    return (
        <PopularAlbumsWrap>
          <h2>인기 앨범</h2>
          <PopularAlbumList>
            {newAlbums.map((album,index) => {
              if(index < 9){
                return (
                  <PopularAlbum key={album.id}>
                    {album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
                    <span>{album.name}</span>
                  </PopularAlbum>
              )
              }
              })}
          </PopularAlbumList>
        </PopularAlbumsWrap>
    );
}

export default PopularAlbums;