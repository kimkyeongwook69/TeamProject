import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";



const RelatedArtistsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  & h1{
    width: 100%;
    padding: 50px 0;
    text-align: center;
    font-size: 0.8rem;
    font-weight: bold;
  }
`

const RelatedArtist = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  line-height: 2.5rem;
  padding: 30px;
  border: 1px solid lightgray;
  font-size: 0.9rem;
  font-weight: bold;
  & div:first-child{
    width: 75%;
  }
  & div:last-child{
    width: 25%;
    text-align: center;
    font-size: 0;
  }
  & a:last-child{
    font-size: 0.8rem;
    border: none;
    padding: 5px 10px;
    background-color: skyblue;
    color: white;
    cursor: pointer;
  }
`

function SearchRelatedArtists({token, keyValue, searchRelatedArtists}){
    const [relatedArtists, setRelatedArtists] = useState([])

    
    useEffect(() => {if(keyValue != "" && {token}) {selectTopArtists();}}, [keyValue])
    
    
    const selectTopArtists = async (e) => {
        const {data} = await axios.get("https://api.spotify.com/v1/artists/" + keyValue + "/related-artists", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" 
          }
        })
        setRelatedArtists(data.artists);
      }
      
      const renderTopArtists = () => {
        return relatedArtists.map(item => (
        <RelatedArtist key={item.id}>
          <div>
            <p>
              이름 : {item.name}<br/>
              팔로워 : {(item.followers.total).toLocaleString()}명<br/>
              장르 : {item.genres}<br/>
              인지도 : {item.popularity} / 100
            </p>
          </div>
          <div>
              <a href={item.external_urls.spotify} target="_blank"><img width={"100%"} src={item.images[0].url} alt=""/></a>
              <a onClick={() => {searchRelatedArtists(item.id);}}>관련 아티스트 찾기</a>
          </div>
        </RelatedArtist>
        ))
      }
      
    return (
        <RelatedArtistsWrap>
            <h1>Spotify id : '{keyValue}'와 관련된 아티스트 입니다.</h1>
            {renderTopArtists()}
        </RelatedArtistsWrap>
    );
}

export default SearchRelatedArtists;