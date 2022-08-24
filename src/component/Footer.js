import React from "react";
import styled from "styled-components";

const FooterWrap = styled.div`
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

function Footer(){
    return (
        <FooterWrap>
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
      </FooterWrap>
    );
}

export default Footer;