import { Col, Row, Card, Input, Avatar, Button, Layout, Divider } from 'antd';
import { UserOutlined, HomeFilled, WalletOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import RequestCredentialsPage from "./requestcredentialspage";
import WalletDetailsPage from './walletdetailspage';
import WalletConfigurationsPage from './walletconfigurationspage';
import ViewCredentialsPage from './viewcredentialspage';
import styled from "styled-components";
import authService from 'services/authService';
import { useHistory } from "react-router-dom";
import axiosService from 'services/axiosService';

const { Search } = Input;
const { Footer } = Layout;

const StyledCardDefault = styled(Card)`
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const StyledText = styled.h3`
    color: #40a9ff;
    font-size: 20px;
    cursor: pointer;
`;

const StyledTextH1 = styled.h1`
    font-size: 30px;
`;

const StyledTextH2 = styled.h2`
    font-size: 25px;
`;

const StyledButton = styled(Button)`
    border-color: #1890ff;
    background: #1890ff;
    background-color: #505050;
    border-color: #505050;
`;

const StyledFooterLink = styled.a`
    color: #505050;
`;

export const LandingPage = () => {
    const [openRequestCredentialsDrawer, setOpenRequestCredentialsDrawer] = useState(false);
    const [openWalletDetailsDrawer, setOpenWalletDetailsDrawer] = useState(false);
    const [openWalletConfigurationsDrawer, setOpenWalletConfigurationsDrawer] = useState(false);
    const [openViewCredentialsDrawer, setOpenViewCredentialsDrawer] = useState(false);
    const history = useHistory();

    const checkPermission = async () => {
        try {
            const email = axiosService.getUserEmail();
            if (email) {
                const responseUserType = await authService.getUserType(email);
                if (responseUserType.toLowerCase() !== 'company') {
                    onLogoutClick();
                }
            } else {
                onLogoutClick();
            }
        } catch (e) {
            onLogoutClick();
        }
    };

    const onLogoutClick = async () => {
        await authService.logoutUser();
        history.push("/");
    };

    const showRequestCredentialsDrawer = () => {
        setOpenRequestCredentialsDrawer(true);
    };

    const onRequestCredentialsDrawerClose = () => {
        setOpenRequestCredentialsDrawer(false);
    };

    const showWalletDetailsDrawer = () => {
        setOpenWalletDetailsDrawer(true);
    };

    const onWalletDetailsDrawerClose = () => {
        setOpenWalletDetailsDrawer(false);
    };

    const showWalletConfigurationsDrawer = () => {
        setOpenWalletConfigurationsDrawer(true);
    };

    const onWalletConfigurationsDrawerClose = () => {
        setOpenWalletConfigurationsDrawer(false);
    };

    const showViewCredentialsDrawer = () => {
        setOpenViewCredentialsDrawer(true);
    };

    const onViewCredentialsDrawerClose = () => {
        setOpenViewCredentialsDrawer(false);
    };

    const onSearch = (value: string) => console.log(value);

    return (
        <div>
            <div>
                <Row>
                    <Col span={24}>
                        <StyledCardDefault style={{
                            margin: "20px",
                            overflow: "hidden",
                            borderWidth: "thin",
                            borderColor: "black",
                            backgroundColor: "#F5F5F5"
                        }}>
                            <Row>
                                <Col span={6}>
                                    <StyledTextH1>My Company Portal</StyledTextH1>
                                </Col>
                                <Col span={6}>
                                    <Search
                                        placeholder="input search text"
                                        allowClear
                                        size="large"
                                        onSearch={onSearch}
                                    />
                                </Col>
                                <Col span={6}></Col>
                                <Col span={2}>
                                    <Avatar size={64} icon={<UserOutlined />} onClick={showViewCredentialsDrawer} />
                                </Col>
                                <Col span={4}>
                                    <Row>
                                        <StyledTextH1>Johan Eriksson</StyledTextH1>
                                    </Row>
                                    <Row>
                                        <Col span={12}></Col>
                                        <Col span={12}><StyledText onClick={onLogoutClick}>Logout</StyledText></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </StyledCardDefault>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <StyledCardDefault style={{
                            margin: "20px",
                            overflow: "hidden",
                            backgroundColor: "#F5F5F5",
                            borderWidth: "0px"
                        }}>
                            <Row>
                                <Col span={1}>
                                    <HomeFilled style={{ fontSize: '25px' }} />
                                </Col>
                                <Col span={1}>
                                    <StyledText>Home</StyledText>
                                </Col>
                            </Row>
                        </StyledCardDefault>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <StyledTextH2>Welcome Johan Eriksson</StyledTextH2>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <StyledCardDefault style={{
                            marginLeft: "20px",
                            marginRight: "10px",
                            overflow: "hidden",
                            borderWidth: "thin",
                            borderColor: "#ddd",
                        }}>
                            <Row>
                                <StyledTextH1>Certificate of registration and register extract</StyledTextH1>
                            </Row>
                            <Row>
                                <StyledButton type="primary" block size={"large"} onClick={showRequestCredentialsDrawer}>Request Now</StyledButton>
                            </Row>
                        </StyledCardDefault>
                    </Col>
                    <Col span={12}>
                        <StyledCardDefault style={{
                            marginRight: "20px",
                            marginLeft: "10px",
                            overflow: "hidden",
                            borderWidth: "thin",
                            borderColor: "#ddd",
                        }}>
                            <Row>
                                <Col span={20}></Col>
                                <Col span={2}>
                                    <BellOutlined style={{ fontSize: '35px' }} />
                                </Col>
                                <Col span={2}>
                                    <SettingOutlined style={{ fontSize: '35px' }} onClick={showWalletConfigurationsDrawer} />
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}></Col>
                                <Col span={1}>
                                    <WalletOutlined onClick={showWalletDetailsDrawer} style={{ fontSize: '50px', color: '#ddd' }} />
                                </Col>
                                <Col span={8} onClick={showWalletDetailsDrawer}>
                                    <StyledTextH1>My wallet</StyledTextH1>
                                </Col>
                            </Row>
                        </StyledCardDefault>
                    </Col>
                </Row>
            </div>
            <StyledFooter>
                <Divider></Divider>
                <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
                    <Row>
                        <Col span={24}>
                            <div><StyledFooterLink href="/company/">Features</StyledFooterLink> | <StyledFooterLink href="/company/">About</StyledFooterLink> | <StyledFooterLink href="/company/">Testimonials</StyledFooterLink> | <StyledFooterLink href="/company/">Contact</StyledFooterLink> | <StyledFooterLink href="/company/">Team</StyledFooterLink></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            Bolagsverket SE -851 81 Sundsvall Sweden
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            © Bolagsverket, Sweden
                        </Col>
                    </Row>
                </Footer>
            </StyledFooter>
            <RequestCredentialsPage onClose={onRequestCredentialsDrawerClose} open={openRequestCredentialsDrawer} />
            <WalletDetailsPage onClose={onWalletDetailsDrawerClose} open={openWalletDetailsDrawer} />
            <WalletConfigurationsPage onClose={onWalletConfigurationsDrawerClose} open={openWalletConfigurationsDrawer} />
            <ViewCredentialsPage onClose={onViewCredentialsDrawerClose} open={openViewCredentialsDrawer} />
        </div>
    );
};

export default LandingPage;