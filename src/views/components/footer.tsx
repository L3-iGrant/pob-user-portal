import styled from "styled-components";
import { Col, Row, Layout, Divider } from 'antd';
import './footer.scss';

const { Footer } = Layout;

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const StyledFooterLink = styled.a`
    font-size: 10px;
    color: white;
`;

export const FooterView = () => {
    return (
        <StyledFooter style={{ backgroundColor: 'rgb(18, 6, 57)'}} className="footer-container">
            <Footer style={{ textAlign: 'center', backgroundColor: 'rgb(18, 6, 57)' }}>
                
                <Row>
                    <Col span={24}>
                        <div style={{ fontWeight: "bold", color: 'white', fontSize: '10px' }}>
                            Proof of Business demo
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ color: 'white', fontSize: '10px' }}>
                            © Bolagsverket, Sweden
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ color: 'gray', fontSize: '8px', marginTop: '15px' }}>
                            Powered by iGrant.io
                        </div>
                        
                    </Col>
                </Row>
            </Footer></StyledFooter>
    );
}

export default FooterView;