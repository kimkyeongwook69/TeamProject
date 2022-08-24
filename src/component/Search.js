import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const SearchArea = styled.div`
  margin: 15px 0;
  padding: 1rem 3rem;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 0.8rem;
  font-weight: bold;
  &.on{
    display: flex;
  }

  & h1{
    width: 100%;
    padding: 30px 0;
  }
`;

const SearchItem = styled.div`
  width: 25%;
  padding: 20px;
  align-items: center;
`;

const SortMenu = styled.div`
  width: 100%;
  text-align: right;
  padding-right: 20px;
  & button{
    border: none;
    padding: 5px 10px;
    background-color: lightgray;
    color: white;
    cursor: pointer;
  }
`
function Search ({token, keyValue}) {
    const [artists, setArtists] = useState([])

    useEffect(() => {if(keyValue != "" && {token}) {searchArtists();}}, [keyValue])
    
    const searchArtists = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: keyValue,
                type: "artist"
            }
        })
    
        setArtists(data.artists.items)
    
        console.log(data.artists.items);
    }
    
    const renderArtists = () => {
      return artists.map(artist => (
          <SearchItem key={artist.id}>
              {artist.images.length ? <a href={artist.external_urls.spotify} target="_blank"><img width={"100%"} src={artist.images[0].url} alt=""/></a> : <a href={artist.external_urls.spotify} target="_blank"><img width={"100%"} src="img/no_image.png"/></a>}
              Artist Name : {artist.name}       <br />
              Popularity  : {artist.popularity} <br />
          </SearchItem>
      ))
    }

    const sortPopularity = () => {
      setArtists([...(artists.sort((a,b) => b.popularity - a.popularity))]);
    }

    const sortReleaseDate = () => {
      setArtists([...React(artists.sort((Date1, Date2) => Date2.releasedate - Date1.releasedate))])
    }

    return(
        <SearchArea>
            <h1>'{keyValue}' 에 대한 검색 결과 입니다.</h1>
            <SortMenu>
                <button onClick={sortPopularity}>인기순</button>
                <button onClick={sortReleaseDate}>최신순</button>
            </SortMenu>
            {renderArtists()}
        </SearchArea>
    )
}


export default Search