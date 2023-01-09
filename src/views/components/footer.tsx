import styled from "styled-components";
import { Col, Row, Layout, Divider } from 'antd';
import './footer.scss';
import { LanguageSelector } from "../../localization/languageselector/menu";
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;

const StyledFooter = styled.div`
    position: static;
    // bottom: 0;
    width: 100%;
    height: 100px;
    margin-top: 50px;
`;

const StyledFooterLink = styled.a`
    font-size: 10px;
    color: white;
`;

export const FooterView = () => {
    const { t, i18n } = useTranslation();

    return (
        <StyledFooter style={{ backgroundColor: 'rgb(254, 203, 0)'}} className="footer-container">
            <Footer 
            
            style={{
                textAlign: 'center',
                backgroundColor: 'rgb(254, 203, 0)',
                padding: '10px 0px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center' 
            }}
            
            >
                
                <Row>
                    <Col span={24}>
                        <div style={{ fontWeight: "bold", color: 'black', fontSize: '10px' }}>
                            Proof of Business
                        </div>
                    </Col>
                    <Col span={24}>
                        <div style={{ color: 'black', fontSize: '10px' }}>
                            © Bolagsverket, Sweden
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ color: 'black', fontSize: '8px', marginTop: 0 }}>
                            Powered by iGrant.io
                        </div>
                        
                    </Col>
                </Row>
            </Footer></StyledFooter>
    );
}

export default FooterView;