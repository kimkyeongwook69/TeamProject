import './App.css';

import styled from "styled-components";
import {useEffect, useState, useRef } from 'react';
import {CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE} from './config'
import Search from './component/Search';
import TopAlbums from './pages/TopAlbums';
import TopArtist from './component/TopArtists';
import NewReleaseAlbum from './component/NewReleaseAlbum';
import axios from 'axios';

// npm install axios

// spotify API Reference
// https://developer.spotify.com/documentation/web-api/reference/#/
// How to use the Spotify API In Your React JS App
// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums 사이트


const Container = styled.div`
  padding: 3rem 5rem;
  min-width: 1400px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header1 = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const LogoImg = styled.img`
  margin-right: 20px;
  vertical-align: bottom;
`;

const LogoName = styled.h1`
  font-size: 2rem;
  width: 12%;
  min-width: 170px;
  font-family: 'Berkshire Swash', cursive;
  color: #005666;
`;

const SearchForm = styled.div`
  width: 55%;
  position: relative;
`;

const SearchInput = styled.input`
  border: 2px solid skyblue;
  padding: 0.5rem 2rem;
  border-radius: 30px;
  width: 100%;
  outline: none;
`;

const SearchButton = styled.button`
  position: absolute;
  background-color:transparent;
  border: none;
  right: 0.5rem;
  cursor: pointer;
`;

const Ranking = styled.div`
  width: 23%;
  height: 35px;
  border: 1px solid skyblue;
  margin-left: 1rem;
  position: relative;
  overflow: hidden;
  & ul{
    height: 100%;
  }
`;

const RankingItem = styled.li`
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 0.8rem;
  padding: 0 1rem;
  position: absolute;
`;




const LogoutButton = styled.button`
  padding: 10px 15px;
  border: 1px solid white;
  background-color: skyblue;
  color: white;
  margin-left: 2rem;
  cursor: pointer;
`;



const MenuItem = styled.li`
  width: 12.5%;
  border-bottom: 1px solid lightgray;
  display: inline-block;
  padding: 0.8rem 1rem;
  text-align: center;
  font-size: 0.8rem;
`;

const NewAlbums = styled.div`
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

const SearchArea = styled.div`
  margin: 15px 0;
  padding: 1rem 3rem;
  display: none;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  
  &.on{
    display: flex;
  }

  & h1{
    width: 100%;
    padding: 30px 0;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const SearchItem = styled.div`
  width: 25%;
  padding: 20px;
`;

const RankingAlbums = styled.div`
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

const Footer = styled.div`
  font-size: 0.8rem;
  text-align: center;
  & ul{
    padding 15px 0;
  }
  & li{
    display:inline-block;
    padding: 0 8px;
    border-right: 1px solid lightgray;
  }
  & li:last-child{
    border-right: none;
  }

  & p{
    line-height: 30px;
  }
  & div:last-child{
    color: gray;
  }
`

const ChartAlbum = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  & img{
    margin: 0 10px;
  }
`

const PopularandRanking = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 15px 0;
`

const PopularAlbums = styled.div`
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
function App() {
const [token, setToken] = useState("")

const [searchKey, setSearchKey] = useState("")
const [artists, setArtists] = useState([])

const [albums, setAlbums] = useState([])

const [newAlbums, setNewAlbums] = useState([])

const searchArea = useRef();
const searchContent = useRef();

const newAlbumWrap = useRef();
const newAlbumCount = useRef(0);

const newAlbumPageRef = useRef([]);

const rankingItemsRef = useRef([]);
const rankingItemsCount = useRef(0);

useEffect(() => {
  const hash = window.location.hash
  let token = window.localStorage.getItem("token")
  
  if (!token && hash) {
    token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
    window.location.hash = ""
    window.localStorage.setItem("token", token)
  }
  
  setToken(token)
}, [])

const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

// const searchArtists = async (e) => {
//   e.preventDefault();
//   searchArea.current.classList.add("on");
//   searchContent.current.innerText = `'${searchKey}'에 대한 검색 결과 입니다.`;
//   const {data} = await axios.get("https://api.spotify.com/v1/search", {
//       headers: {
//           Authorization: `Bearer ${token}`
//       },
//       params: {
//           q: searchKey,
//           type: "artist"
//       }
//   })
//   setArtists(data.artists.items);
//   console.log(data)
// }

// const renderArtists = () => {
//   return artists.map(artist => (
//       <SearchItem key={artist.id}>
//           {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
//           <p>{artist.name}</p>
//       </SearchItem>
//   ))
// }

const searchAlbums = async (e) => {
  e.preventDefault();
  searchArea.current.classList.add("on");
  searchContent.current.innerText = `'${searchKey}'에 대한 검색 결과 입니다.`;
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "album"
      }
  })
  setAlbums(data.albums.items);
  console.log(data.albums.items)
}

const renderAlbums = () => {
  return albums.map(album => (
      <SearchItem key={album.id}>
          {album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
          <p>{album.name}</p>
      </SearchItem>
  ))
}


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
  newReleaseAlbum();
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
    <Container>
      <header>
        <Header1>
          <LogoName><LogoImg src="img/logo.png" width="36px"/>Music</LogoName>
            {token ?
              <SearchForm>
                <form onSubmit={searchAlbums}>
                  <SearchInput type="text" onChange={e => setSearchKey(e.target.value)}/>
                  <SearchButton type={"submit"}><img src="img/search.png" width="32px"/></SearchButton>
                </form>
              </SearchForm>
            :
              <h2>Please Login</h2>
            }
        
        <Ranking>
          <ul>
            <RankingItem ref={elem => (rankingItemsRef.current[0] = elem)}><span>1. searchMusic</span></RankingItem>
          </ul>
        </Ranking>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
          Login to Spotify
          </a>
          : 
          <LogoutButton onClick={logout}>Logout</LogoutButton>}
        </Header1>
        <nav>
          <ul>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem><TopAlbums token={token} searchId={albums} /></MenuItem>
            {/* {console.log(artists)} */}
            <MenuItem>4</MenuItem>
            <MenuItem>5</MenuItem>
            <MenuItem>6</MenuItem>
            <MenuItem>7</MenuItem>
            <MenuItem>8</MenuItem>
          </ul>
        </nav>
    </header>
    <main>
      <SearchArea ref={searchArea}>
        <h1 ref={searchContent}></h1>
        {renderAlbums()}
      </SearchArea>
      <NewAlbums>
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
                    {album.images.length ? <img width={"100%"} src={album.images[0].url} alt=""/> : <div>No Image</div>}
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
      </NewAlbums>
      <PopularandRanking>
        <PopularAlbums>
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
        </PopularAlbums>
        <RankingAlbums>
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
        </RankingAlbums>
      </PopularandRanking>


      {/* <div className="App">
      <header className="App-header">
        <h1>Spotify React</h1>
        {!token ?
                      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                          to Spotify</a>
                      : <button onClick={logout}>Logout</button>}
      <Search token={token}/>
      <TopArtist token={token} />
    </header>
      <NewReleaseAlbum token={token} /> */}
    {/* </div> */}
    </main>


    <footer>
      <Footer>
          <div>
            <ul>
              <li><a>이용약관</a></li>
              <li><a>회사 소개</a></li>
              <li><a>개인정보처리방침</a></li>
              <li><a>청소년보호정책</a></li>
              <li><a>제휴/프로모션 문의</a></li>
              <li><a>이메일주소무단수집거부</a></li>
              <li><a>파트너센터</a></li>
            </ul>
          </div>
            <div>
              <p>
                (주)카카오엔터테인먼트 서울특별시 성북구 오패산로3길 104(하월곡동) | Tel. 02-940-3000 Fax. 02-942-4350 | ※ 고객지원센터 : 080-940-3333 (무료상담전화)<br/>
                상담시간 (평일) 오전 9시 - 오후 6시 [점심시간 : 오후 12시 - 1시 ]<br/>
                Copyright © Samyang Foods Co., Ltd All Rights Reserved.
              </p>
            </div>
      </Footer>
    </footer>
    
    </Container>

)
}

export default App;