import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import styled from "styled-components";

const SearchAlbumWrap = styled.div`
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

const SearchAlbum = styled.div`
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
`;

const SearchArtistsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  & h1{
    width: 100%;
    padding: 50px 0;
    text-align: center;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const Artist = styled.div`
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
`;

function Search ({token}) {
    const data = useLocation();
    const keyValue = data.state.value;
    const searchOption = data.state.option;
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
      if(keyValue !== "" && {token}) {
        switch (searchOption) {
          case "artist":
            {searchArtists();}
            break;
          case "album":
            {searchAlbums()}
            break;
          default:
            break;
        }
      }
    }, [keyValue,searchOption]);
    
    const searchArtists = async () => {
          const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" 
            },
            params: {
                q: keyValue,
                type: "artist"
            }
          });
          setArtists(data.artists.items)
    };
    console.log(artists)
    
    const searchAlbums = async () => {
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
              Authorization: `Bearer ${token}`
          },
          params: {
              q: keyValue,
              type: "album"
          }
      });
      setAlbums(data.albums.items);
    };

    const renderAlbums = () => {
      return albums.map(album => (
          <SearchAlbum key={album.id}>
              {album.images.length ? <a href={album.external_urls.spotify} target="_blank"><img width={"100%"} src={album.images[0].url} alt=""/></a> : <a href={album.external_urls.spotify} target="_blank"><img width={"100%"} src="img/no_image.png"/></a>}
              {album.name}
          </SearchAlbum>
      ))
    }

    const renderArtists = () => {
      return artists.map(artist => (
        <Artist key={artist.id}>
          {/* {console.log(artist.name)} */}
        <div>
          <p>
            이름 : {artist.name}<br/>
            팔로워 : {(artist.followers.total).toLocaleString()}명<br/>
            장르 : {artist.genres}<br/>
            인지도 : {artist.popularity} / 100
          </p>
        </div>
        <div>
            {artist.images.length ? <a href={artist.external_urls.spotify} target="_blank"><img width={"100%"} src={artist.images[0].url} alt=""/></a> : <a href={artist.external_urls.spotify} target="_blank"><img width={"100%"} src="img/no_image.png"/></a>}
            <a href={artist.external_urls.spotify}  target="_blank">Spotify 검색</a>
        </div>
      </Artist>
      ))
    }

    const sortReleaseDateAlbums = () => {
      setAlbums([...(albums.sort((a,b) => new Date(b.release_date) - new Date(a.release_date)))]);
    }

    const sortPopularArtists = () => {
      setArtists([...(artists.sort((a,b) => new Date(b.popularity) - new Date(a.popularity)))]);
    }

    const sortFollowerArtists = () => {
      setArtists([...(artists.sort((a,b) => new Date(b.followers.total) - new Date(a.followers.total)))]);
    }

    switch (searchOption) {
      case "album":
        return(
          <SearchAlbumWrap>
              <SortMenu>
                <button onClick={sortReleaseDateAlbums}>최신순</button>
              </SortMenu>
              {renderAlbums()}
          </SearchAlbumWrap>
      )

      case "artist":
        return (
          <SearchArtistsWrap>
            <SortMenu>
              <button onClick={sortFollowerArtists}>최신순</button>
              <button onClick={sortPopularArtists}>인기순</button>
            </SortMenu>
              {renderArtists()}
          </SearchArtistsWrap>
      )
    
      default:
        return (
          <></>
        )
    }
  }

export default Search;