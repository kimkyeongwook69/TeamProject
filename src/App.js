import './App.css';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import styled from "styled-components";
import {CLIENT_ID, REDIRECT_URI, AUTH_ENDPOINT, RESPONSE_TYPE} from './config'
import Search from './component/Search';
import NewAlbums from './component/NewAlbums';
import PopularAlbums from './component/PopularAlbums';
import RankingAlbums from './component/RankingAlbums';
import Footer from './component/Footer';
import SearchRelatedArtists from './component/SearchRelatedArtists';

<<<<<<< HEAD
=======
// npm install
// npm install axios
// npm install styled-components
// npm install react-router-dom
  
// spotify API Reference
// https://developer.spotify.com/documentation/web-api/reference/#/
// How to use the Spotify API In Your React JS App
// https://dev.to/dom_the_dev/how-to-use-the-spotify-api-in-your-react-js-app-50pn

>>>>>>> origin
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

const SearchSelect = styled.select`
  position: absolute;
  border: none;
  background-color:transparent;
  padding: 8px 5px;
  padding-left: 15px;
  left: 12px;
  outline: none;
`

const SearchInput = styled.input`
  border: 2px solid skyblue;
  padding: 0.5rem 2rem;
  padding-left: calc(135px + 0.8rem);
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

<<<<<<< HEAD
=======





>>>>>>> origin
const PopularandRanking = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 15px 0;
`;

function App() {
<<<<<<< HEAD
=======
  const [token, setToken] = useState("")
>>>>>>> origin

  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

const [newAlbums, setNewAlbums] = useState([])

const [searchOption, setSearchOption] = useState(0);

const [artistKey,SetArtistKey] = useState("");

const searchArea = useRef();
const searchContent = useRef();
const searchRef = useRef("");
const searchSelectRef = useRef("");

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
  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

const searchArtists = async (e) => {
  e.preventDefault();
  switch(searchSelectRef.current.value){
    case "search":
      setSearchKey(searchRef.current.value);
      setSearchOption(1);
      break;
    case "relatedArtists":
      SetArtistKey(searchRef.current.value);
      setSearchOption(2);
      break;
    default:
        break;
  }
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


<<<<<<< HEAD
useEffect(() => {
  const rolling = setInterval(() => {rollingBar();}, 4000);
},[]);
=======



  useEffect(() => {
    const rolling = setInterval(() => {rollingBar();}, 4000);
  },[]);
>>>>>>> origin

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

const searchRelatedArtists = (id) => {
  searchRef.current.value = id;
  SetArtistKey(id);
}



  return (
    <Container>
      <header>
        <Header1>
          <LogoName><LogoImg src="img/logo.png" width="36px"/>Music</LogoName>
          {token ?
          <SearchForm>
            <form onSubmit={searchArtists}>
                <SearchSelect ref={searchSelectRef}>
                  <option value="search" selected>search</option>
                  <option value="relatedArtists" >relatedArtists</option>
                </SearchSelect>
                <SearchInput type="text" ref={searchRef}/>
                <SearchButton type={"submit"}><img src="img/search.png" width="32px"/></SearchButton>
            </form>
          </SearchForm>
          : <h2>Please Login</h2>
        }
        {/* <Search token={token} /> */}

        <Ranking>
          <ul>
            <RankingItem className='selected' ref={elem => (rankingItemsRef.current[0] = elem)}><span>1. 0TnOYISbd1XYRBk9myaseg</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[1] = elem)}><span>2. 6yTYR09WCvsgdnurDW4WQo</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[2] = elem)}><span>3. 5nkYRuiIHg2xXHFC8bfosJ</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[3] = elem)}><span>4. 0N0d3kjwdY2h7UVuTdJGfp</span></RankingItem>
            <RankingItem ref={elem => (rankingItemsRef.current[4] = elem)}><span>5. 7MlcYSTwlLeOtBMDJ6WOv5</span></RankingItem>
          </ul>
          
        </Ranking>
        {!token ?
                      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                          to Spotify</a>
                      : <LogoutButton onClick={logout}>Logout</LogoutButton>}
        </Header1>
        <nav>
          <ul>
            {/* <MenuItem><TopAlbums token={token} searchId={albums} newRelease={newAlbums} check={check} /><a></a></MenuItem> */}
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
      {searchOption == 1 ? <Search token={token} keyValue={searchKey}/> : <></>}
      {searchOption == 2 ? <SearchRelatedArtists token={token} keyValue={artistKey} searchRelatedArtists={searchRelatedArtists}/> : <></>}
      
      <NewAlbums token={token}/>

      <PopularandRanking>
        <PopularAlbums token={token}/>
        <RankingAlbums token={token}/>
      </PopularandRanking>
    </main>
    <footer>
      <Footer/>
    </footer>
<<<<<<< HEAD
    
=======
>>>>>>> origin
    </Container>
  );
}

export default App;
