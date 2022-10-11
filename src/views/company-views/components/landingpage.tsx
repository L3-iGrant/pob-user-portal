import { Col, Row, Card, Input, Avatar, Button, Layout, Divider, Space } from 'antd';
import { UserOutlined, HomeFilled, WalletOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import RequestCredentialsPage from "./requestcredentialspage";
import WalletDetailsPage from './walletdetailspage';
import WalletConfigurationsPage from './walletconfigurationspage';
import ViewCredentialsPage from './viewcredentialspage';
import ViewSelectedCredentialPage from './viewselectedcredentialpage';
import styled from "styled-components";
import authService from 'services/authService';
import { useHistory } from "react-router-dom";
import axiosService from 'services/axiosService';
import companyService from 'services/companyService';
import walletIcon from '../../../assets/img/icons/wallet.png';



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
    margin-bottom: 20px;
`;

const StyledCompanyHeader = styled.h1`
    font-size: 45px;
    text-align: left;
`;

const StyledTextH2 = styled.h2`
    font-size: 30px;
    font-weight: 400;
    text-align: left;
    padding-left: 20px;
`;

const StyledButton = styled(Button)`
    border-color: #1890ff;
    background: #1890ff;
    background-color: #505050;
    border-color: #505050;
`;

const StyledFooterLink = styled.a`
    flex: 1;
    justify-content: "center";
    align-items: "center";
    color :'white';
    font-size: "0.8rem";
    text-align: "center";
    margin-bottom:'22px';
`;


export const LandingPage = () => {
    const [openRequestCredentialsDrawer, setOpenRequestCredentialsDrawer] = useState(false);
    const [openWalletDetailsDrawer, setOpenWalletDetailsDrawer] = useState(false);
    const [openWalletConfigurationsDrawer, setOpenWalletConfigurationsDrawer] = useState(false);
    const [openViewCredentialsDrawer, setOpenViewCredentialsDrawer] = useState(false);
    const [openViewSelectedCredentialDrawer, setOpenViewSelectedCredentialDrawer] = useState(false);
    const [walletData, setWalletData] = useState({});
    const [certificates, setCertificates] = useState<string[]>([]);
    const [lastCertificateData, setLastCertificateData] = useState<any>({});
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

    const getConnections = async () => {
        const data = await companyService.getConnections();
        setWalletData(data);
        return;
        const invitation_ids: any = {};
        (data.invitation_data || []).map(
            (x: any) => {
                const key: string = x[0];
                invitation_ids[key] = x[1];
            }
        )
        if (data) {
            console.log({ data, invitation_ids });
            const keys = Object.keys(invitation_ids);
            data.result?.slice().reverse().every((element: any) => {
                if (element.state === 'active') {
                    console.log(element);
                    if (keys.includes(element.connection_id)) {
                        console.log("found match");
                        let walletData = invitation_ids[element.connection_id];
                        walletData = walletData.replace("b'", '')
                        walletData = walletData.slice(0, -1)
                        walletData = JSON.parse(walletData);
                        setWalletData(walletData);
                        return false;
                    }
                    return true;
                }
                return true;
            });
        }
    };

    const onLogoutClick = async () => {
        await authService.logoutUser();
        localStorage.removeItem('token');
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

    const showViewSelectedCredentialDrawer = () => {
        setOpenViewSelectedCredentialDrawer(true);
    };

    const onViewSelectedCredentialDrawerClose = () => {
        setOpenViewSelectedCredentialDrawer(false);
    };

    const onSearch = (value: string) => console.log(value);

    const getCertificates = async () => {
        const data = await companyService.getCertificates();
        setCertificates(['a4ba07c9-c7ed-4376-b5d7-043913c03921']);
        console.log({data});
    }

    useEffect(() => {
        setTimeout(() => {
            getConnections();
            getCertificates()
        }, 500)
    }, []);

    useEffect(() => {
        console.log("Here", certificates);
        if(certificates.length > 0){
            (async () => {
                const exchangeId = certificates[certificates.length - 1];
                if(exchangeId){
                    const data = await companyService.checkCertificate(exchangeId);
                    setLastCertificateData(data);
                }
            })();
            

        }
    }, [certificates.join(',')])

    return (
        <div>
            <div>
                <Row gutter={16}>
                    <Col span={24}>
                        <StyledCardDefault style={{
                            margin: "20px",
                            overflow: "hidden",
                            borderWidth: "thin",
                            borderColor: "black",
                            backgroundColor: "#F5F5F5"
                        }}>
                            <Row style={{ 'alignItems': 'center' }}>
                                <Col span={8}>
                                    <StyledCompanyHeader>My Company Portal</StyledCompanyHeader>
                                </Col>
                                <Col span={4}>
                                    <Search
                                        placeholder="input search text"
                                        allowClear
                                        size="large"
                                        onSearch={onSearch}
                                    />
                                </Col>
                                <Col span={6}></Col>
                                <Col span={2}>
                                    <Avatar size={64} icon={<UserOutlined />} onClick={() => { }} />
                                </Col>
                                <Col span={4} style={{ textAlign: 'right' }}>
                                    <Row>
                                        <Col span={24}>
                                            <StyledTextH1>Johan Eriksson</StyledTextH1>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={24}><StyledText onClick={onLogoutClick}>Logout</StyledText></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </StyledCardDefault>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <StyledCardDefault style={{
                            margin: " 0 20px 20px 20px ",
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
                        <StyledTextH2>Welcome Johan Eriksson!</StyledTextH2>
                    </Col>
                </Row>

                <Row style={{ 'paddingTop': '20px' }}>
                    <Col span={12}>
                        <StyledCardDefault style={{
                            marginLeft: "20px",
                            marginRight: "10px",
                            overflow: "hidden",
                            borderWidth: "thin",
                            borderColor: "#ddd",
                            padding: "30px 40px",
                            minHeight: "225px"
                        }}>
                            <Row style={{ 'textAlign': 'center' }}>
                                <Col span={24}>
                                    <StyledTextH1>Certificate of registration and register extract</StyledTextH1>
                                </Col>
                            </Row>
                            <Row>
                                <StyledButton type="primary" block size={"large"} 
                                    onClick={showRequestCredentialsDrawer} 
                                    disabled={lastCertificateData?.state !== 'credential_acked'}>
                                        Request Now
                                </StyledButton>
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
                            padding: "30px 40px",
                            minHeight: "225px"
                        }}

                        >
                            <Row style={{ 'position': 'absolute', 'top': '20px', 'right': '20px' }}>
                                <Space>
                                    <BellOutlined style={{ fontSize: '35px' }} onClick={showViewCredentialsDrawer} />
                                    <SettingOutlined style={{ fontSize: '35px' }} onClick={showWalletConfigurationsDrawer} />
                                </Space>

                            </Row>
                            <Row>
                                <Col>
                                    &nbsp;
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}></Col>
                                <Col span={1}>
                                    <img src={walletIcon} />
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
                <Footer style={{ textAlign: 'center', backgroundColor: 'white' }}>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&copy;&nbsp;2017-{new Date().getFullYear()} LCubed AB, Sweden&nbsp;&nbsp;&nbsp;<StyledFooterLink href="https://igrant.io/privacy.html#cookies" target="_blank" rel="noopener noreferrer" >Cookies Policy</StyledFooterLink> &nbsp;| &nbsp;<StyledFooterLink href="https://igrant.io/terms.html" target="_blank" rel="noopener noreferrer" >Terms of Service</StyledFooterLink> &nbsp;| &nbsp;
                        <StyledFooterLink href="https://igrant.io/privacy.html#privacy" target="_blank" rel="noopener noreferrer" >Privacy Policy</StyledFooterLink>
                    </div>
                </Footer>
            </StyledFooter>
            <RequestCredentialsPage onClose={onRequestCredentialsDrawerClose} open={openRequestCredentialsDrawer} />
            <WalletDetailsPage onClose={onWalletDetailsDrawerClose} open={openWalletDetailsDrawer} walletData={walletData} />
            <WalletConfigurationsPage onClose={onWalletConfigurationsDrawerClose} open={openWalletConfigurationsDrawer} />
            <ViewCredentialsPage onClose={onViewCredentialsDrawerClose} open={openViewCredentialsDrawer} showViewSelectedCredentialDrawer={showViewSelectedCredentialDrawer} />
            <ViewSelectedCredentialPage onClose={onViewSelectedCredentialDrawerClose} open={openViewSelectedCredentialDrawer} showViewCredentialsDrawer={showViewCredentialsDrawer} 
                data={lastCertificateData.credential_proposal_dict?.credential_proposal?.attributes || []} />
        </div>
    );
};

export default LandingPage;