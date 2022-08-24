import '../App.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";

const RankingAlbumsWrap = styled.div`
  width: 300px;
  font-size: 0.8rem;
  font-weight: bold;

  & h2{
    margin-bottom: 10px;
  }
  & li{
    width: 100px;
    display: inline-block;
    text-align: center;
    border: 1px solid lightgray;
    padding: 7px 0;
    cursor: pointer;
  }
`

const RankingAlbumList = styled.div`
  border: 1px solid lightgray;
`

const ChartAlbum = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  & img{
    margin: 0 10px;
  }
`

function RankingAlbums({token}){

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
        <RankingAlbumsWrap>
          <h2>음악차트</h2>
          <div>
            <ul>
              <li>TOP10</li>
              <li>POP</li>
              <li>아티스트</li>
            </ul>

            <RankingAlbumList>
            {newAlbums.map((album,index) => {
              if(index < 10){
                return (
                  <ChartAlbum key={album.id}>
                    <span>{index + 1}</span>
                    {album.images.length ? <img width={"25%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
                    <span>{album.name}</span>
                  </ChartAlbum>
                
              )
              }
              })}
            </RankingAlbumList>
          </div>
          
        </RankingAlbumsWrap>
    );
}

export default RankingAlbums;