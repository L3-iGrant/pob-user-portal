import styled from "styled-components";
import { Col, Row, Layout, Divider } from 'antd';

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
        <StyledFooter style={{ backgroundColor: 'rgb(18, 6, 57)' }}>
            <Divider></Divider>
            <Footer style={{ textAlign: 'center', backgroundColor: 'rgb(18, 6, 57)' }}>
                <Row>
                    <Col span={24}>
                        <div style={{ marginTop: "-45px", marginBottom: "20px", color: 'white' }}> 
                            <StyledFooterLink >Features</StyledFooterLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <StyledFooterLink >About</StyledFooterLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <StyledFooterLink >Testimonials</StyledFooterLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <StyledFooterLink >Contact</StyledFooterLink>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            <StyledFooterLink >Team</StyledFooterLink></div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div style={{ fontWeight: "bold", color: 'white', fontSize: '10px' }}>
                            Bolagsverket SE -851 81 Sundsvall Sweden
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
            </Footer></StyledFooter>
    );
}

export default FooterView;