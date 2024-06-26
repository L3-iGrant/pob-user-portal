import React from "react";
import styled from "styled-components";


const StyledLink = styled.a`
    color: #40a9ff;
`;

export const Logo = () => (
  <div className='app-watermark'>
    <p style={{fontSize:10,lineHeight:'10px'}}>Powered By <StyledLink style={{margin:0}} target='_blank' href='https://igrant.io'>iGrant.io</StyledLink></p>
    {/* <img src={companyLogo} style={{width:LOGO_WIDTH,height:LOGO_HEIGHT}} alt='company-logo' /> */}
  </div>
);
