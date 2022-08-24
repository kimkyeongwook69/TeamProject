import '../App.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";


const NewAlbumsWrap = styled.div`
  margin: 15px 0;
  font-size: 0.8rem;
  font-weight: bold;
  position: relative;
`;

const ButtonArea = styled.div`
  position: absolute;
  right: 0;
  top: 8px;
`

const ArrowButton = styled.a`
  border: 1px solid lightgray;
  border-bottom: none;
  padding: 0 4px;
  color: gray;
  cursor: pointer;
`

const NewAlbumList = styled.div`
  margin-top: 10px;
  overflow: hidden;
`
const NewAlbumListWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  left: 0;
  transition: 1s;
`

const NewAlbum = styled.div`
  width: 12.5%;
  flex: none;
  padding: 5px;
  border: 1px solid lightgray;
  text-align: center;
`;


const NewAlbumListPages = styled.div`
  text-align: center;
  padding 12px 0;
`

const NewAlbumListPage = styled.li`
  width: 15px;
  height: 15px;  
  border: 2px solid lightgray;
  display: inline-block;
  margin: 0 3px;
  border-radius: 50%;
  cursor: pointer;
  &.on{
    background-color: lightgray;
  }
`

function NewAlbums({token}){
    const [newAlbums, setNewAlbums] = useState([]);
    const newAlbumWrap = useRef();
    const newAlbumCount = useRef(0);
    const newAlbumPageRef = useRef([]);

    useEffect(() => {
        async function newReleaseAlbum() {
          const response = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
          setNewAlbums(response.data.albums.items);
          console.log(response.data.albums.items);
        }
        newReleaseAlbum() 
      },[token])      

    const moveNewAlbumPage = (e) => {
        switch(e.target.id){
          case "arrow-prev":
            if(newAlbumCount.current > 0){
              newAlbumPageRef.current[newAlbumCount.current].classList.toggle("on");
              newAlbumCount.current -= 1;
              newAlbumPageRef.current[newAlbumCount.current].classList.toggle("on");
              newAlbumWrap.current.style.left = -(newAlbumCount.current * 12.5) + "%";
            }
            break;
          case "arrow-next":
            if(newAlbumCount.current < 12){
              newAlbumPageRef.current[newAlbumCount.current].classList.toggle("on");
              newAlbumCount.current += 1;
              newAlbumPageRef.current[newAlbumCount.current].classList.toggle("on");
              newAlbumWrap.current.style.left = -(newAlbumCount.current * 12.5) + "%";
            }
            break;
          default:
            break;
        }
    }
    
    const testMove = (e) => {
        let number = (e.target.id.split("-")[1]) - 1;
      
        newAlbumPageRef.current[newAlbumCount.current].classList.toggle("on");
        
        newAlbumCount.current = number;
      
        e.target.classList.toggle("on");
        newAlbumWrap.current.style.left = -(newAlbumCount.current * 12.5) + "%";
    }

    return (
        <NewAlbumsWrap>
        <h1>최신 앨범</h1>
        <ButtonArea>
          <ArrowButton id="arrow-prev" onClick={moveNewAlbumPage}>&#10094;</ArrowButton>
          <ArrowButton id="arrow-next" onClick={moveNewAlbumPage}>&#10095;</ArrowButton>
        </ButtonArea>
      {token ?
        (
          <div>
            <NewAlbumList>
              <NewAlbumListWrap ref={newAlbumWrap}>
              {newAlbums.map(album => (
                  <NewAlbum key={album.id}>
                    {album.images.length ? <a href={album.external_urls.spotify} target="_blank"><img width={"100%"} src={album.images[0].url} alt=""/></a> : <div>No Image</div>}
                    {album.name}
                  </NewAlbum>
                
              ))}
              </NewAlbumListWrap>
            </NewAlbumList>
            <NewAlbumListPages>
              <ul>
                <NewAlbumListPage id="np-1" className='on' onClick={testMove} ref={elem => (newAlbumPageRef.current[0] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-2" onClick={testMove} ref={elem => (newAlbumPageRef.current[1] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-3" onClick={testMove} ref={elem => (newAlbumPageRef.current[2] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-4" onClick={testMove} ref={elem => (newAlbumPageRef.current[3] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-5" onClick={testMove} ref={elem => (newAlbumPageRef.current[4] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-6" onClick={testMove} ref={elem => (newAlbumPageRef.current[5] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-7" onClick={testMove} ref={elem => (newAlbumPageRef.current[6] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-8" onClick={testMove} ref={elem => (newAlbumPageRef.current[7] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-9" onClick={testMove} ref={elem => (newAlbumPageRef.current[8] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-10" onClick={testMove} ref={elem => (newAlbumPageRef.current[9] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-11" onClick={testMove} ref={elem => (newAlbumPageRef.current[10] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-12" onClick={testMove} ref={elem => (newAlbumPageRef.current[11] = elem)}></NewAlbumListPage>
                <NewAlbumListPage id="np-13" onClick={testMove} ref={elem => (newAlbumPageRef.current[12] = elem)}></NewAlbumListPage>
                
                
              </ul>
            </NewAlbumListPages>
          </div>
        )
      :(<></>)}
      </NewAlbumsWrap>
    );
}

export default NewAlbums;