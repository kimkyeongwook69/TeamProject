import './App.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE} from './config'
import Search from './component/Search';
import TopArtist from './component/TopArtists';
import NewReleaseAlbum from './component/NewReleaseAlbum';
import Test from './component/Test';
import NewAlbums from './component/NewAlbums';
import PopularAlbums from './component/PopularAlbums';
import RankingAlbums from './component/RankingAlbums';
import Footer from './component/Footer';


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
  top: 35px;

  &.selected{
    transition: 1s;
    top: 0px;
  }
  &.selected-after{
    transition: 1s;
    top: -35px;
  }
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


const SearchArea = styled.div`
  margin: 15px 0;
  padding: 1rem 3rem;
  display: none;
  flex-wrap: wrap;
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
`;


const PopularandRanking = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 15px 0;
`

function App2() {
const CLIENT_ID = "23bdd6549ab046a989e1c473266f1264"
const REDIRECT_URI = "http://localhost:3000"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const [token, setToken] = useState("")

const [searchKey, setSearchKey] = useState("")
const [artists, setArtists] = useState([])

const [newAlbums, setNewAlbums] = useState([])

const searchArea = useRef();
const searchContent = useRef();


const rankingItemsRef = useRef([]);
const rankingItemsCount = useRef(1);

useEffect(() => {
  const hash = window.location.hash
  let token = window.localStorage.getItem("token")
  
  if (!token && hash) {
    token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
    
    window.location.hash = ""
    window.localStorage.setItem("token", token)
  }
  
  setToken(token)

  console.log("ttetst");
}, [])

const logout = () => {
  setToken("")
  window.localStorage.removeItem("token")
}

const searchArtists = async (e) => {
  e.preventDefault();
  searchArea.current.classList.add("on");
  searchContent.current.innerText = `'${searchKey}'에 대한 검색 결과 입니다.`;
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          q: searchKey,
          type: "artist"
      }
  })

  setArtists(data.artists.items);
}

const renderArtists = () => {
  return artists.map(artist => (
      <SearchItem key={artist.id}>
          {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          <p>{artist.name}</p>
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
  newReleaseAlbum() 
},[token])





useEffect(() => {
  const rolling = setInterval(() => {rollingBar();}, 4000);
},[]);

const rollingBar = () => {
  if(rankingItemsCount.current > 1){
    rankingItemsRef.current[(rankingItemsCount.current) - 2].classList.toggle("selected-after");
  }else if(rankingItemsCount.current == 1){
    rankingItemsRef.current[4].classList.remove("selected-after");
  }

  if(rankingItemsCount.current != 0){
    rankingItemsRef.current[(rankingItemsCount.current) - 1].classList.toggle("selected");
    rankingItemsRef.current[(rankingItemsCount.current) - 1].classList.toggle("selected-after");

    rankingItemsRef.current[rankingItemsCount.current].classList.toggle("selected");
  }else{
    rankingItemsRef.current[rankingItemsCount.current].classList.toggle("selected");
    rankingItemsRef.current[3].classList.toggle("selected-after");
    rankingItemsRef.current[4].classList.toggle("selected");
    rankingItemsRef.current[4].classList.toggle("selected-after");
  }

  rankingItemsCount.current += 1;
  if(rankingItemsCount.current == 5){
    rankingItemsCount.current = 0;
  }
}





  return (
    <Container>
      <header>
        <Header1>
          <LogoName><LogoImg src="img/logo.png" width="36px"/>Music</LogoName>
          {token ?
          <SearchForm>
            <form onSubmit={searchArtists}>
                <SearchInput type="text" onChange={e => setSearchKey(e.target.value)}/>
                <SearchButton type={"submit"}><img src="img/search.png" width="32px"/></SearchButton>
            </form>
          </SearchForm>
          : <h2>Please Login</h2>
        }

        <Ranking>
          <ul>
            <RankingItem className='selected' ref={elem => (rankingItemsRef.current[0] = elem)}><span>1. keyword1</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[1] = elem)}><span>2. keyword2</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[2] = elem)}><span>3. keyword3</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[3] = elem)}><span>4. keyword4</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[4] = elem)}><span>5. keyword5</span></RankingItem>
          </ul>
          
        </Ranking>
        {!token ?
                      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                          to Spotify</a>
                      : <LogoutButton onClick={logout}>Logout</LogoutButton>}
        </Header1>
        <nav>
          <ul>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
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
        {renderArtists()}
      </SearchArea>

      <NewAlbums token={token}/>

      <PopularandRanking>
        <PopularAlbums token={token}/>
        <RankingAlbums token={token}/>
      </PopularandRanking>
    </main>
    <footer>
      <Footer/>
    </footer>
    </Container>
  );
}

export default App2;