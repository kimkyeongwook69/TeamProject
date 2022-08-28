import { useEffect, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser'
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const ConcertWrap = styled.div`
    width: calc(100% - 360px);
    padding-top: 15px;
    & h1{
      width: 100%;
      font-size: 0.8rem;
      font-weight: bold;
    }
`
const ConcertList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 15px;
`

const Concert = styled.div`
    width: 32.5%;
    padding: 15px;
    text-align: center;
    position: relative;
    font-size: 0.8rem;
    font-weight: bold;

    
    & img{
        width: 100%;
        height: 350px;
        margin-bottom: 10px;
        border: 1px solid lightgray;
    }
    & span{
        display: inline-block;
        padding: 5px 0;
    }
    a {
      cursor: pointer;
    }
`

function parseJson(dataSet) {
    const dataArr = new XMLParser().parseFromString(dataSet);
    return dataArr;
}
  
  const Concerts = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const readShowList = async () => {
            try {
              const response = await axios.get(
                '/pblprfr?service=5142c77db2284ca09ff559832f6858e2&stdate=20220703&eddate=20220801&cpage=1&rows=9',
              );
               const xmlData = response.data;
               const jsonData = parseJson(xmlData);
               // const parse
               setData(jsonData.children);
            } catch (e) {
              console.log(e);
            }
          };
          readShowList();    
    },[]);

    const goDetail = (id) => {
      navigate("/detail", {state : {id : id}});
      // searchRef.current.value = "";
    }

    return (
      <ConcertWrap>
        <h1>공연 목록</h1>
        <ConcertList>
          {data.length !== 0 &&
          (
              data.map((item) => (
                  <Concert>
                        <a onClick={() => {goDetail(item.children[0].value)}}>
                        <img src={item.children[5].value}/>
                        </a>
                      <span>{item.children[1].value}</span>
                  </Concert>)
              )
          )}
        </ConcertList>
      </ConcertWrap>
    );
   };

export default Concerts;


