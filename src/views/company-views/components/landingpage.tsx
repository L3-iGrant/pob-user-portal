import { Col, Row, Card, Input, Avatar, Button, Layout, Divider, Space, Grid } from 'antd';
import { UserOutlined, HomeFilled, WalletOutlined, BellOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Popover, PopoverBody, ListGroup, ListGroupItem, Card as ReactStrapCard, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
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
import headerLogo from '../../../assets/img/icons/pob_logo.png';
import walletIcon from '../../../assets/img/icons/wallet.png';
import FooterView from 'views/components/footer';
const { useBreakpoint } = Grid;



const { Search } = Input;
const { Footer } = Layout;

const StyledCardDefault = styled(Card)`
    padding: 30px 40px;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;

const StyledHeaderCardDefault = styled(Card)`
    .ant-card-body {
        padding: 8px;
    }
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
`;

const StyledBreadCrumbCardDefault = styled(Card)`
    .ant-card-body {
        padding: 10px;
    }
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
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
    font-size: 18px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
`;

const StyledTextName = styled.h1`
    font-size: 28px;
    margin-bottom: 5px;
    margin-right: 30px;
`;

const StyledTextLogout = styled.h3`
    color: blue;
    font-size: 20px;
    cursor: pointer;
    margin-right: 30px;
`;

const StyledMiddleText = styled.h3`
    font-size: 20px;
    margin-right: 30px;
`;

const StyledCompanyHeader = styled.h1`
    font-size: 45px;
    text-align: right;
    margin-right: 10px;
`;

const StyledCompanyHeaderMobile = styled.h1`
    font-size: 30px;
    text-align: right;
    margin-right: 10px;
`;

const StyledTextH2 = styled.h2`
    font-size: 30px;
    font-weight: 400;
    text-align: left;
`;

const StyledButton = styled(Button)`
    background-color: black;
    border-color: #505050;

    :focus {
        background-color: black;
    }

    :hover {
            background-color: #fff;
    border: 1px solid #DFDFDF;
    color: #031313;
    }
`;

/* const StyledFooterLink = styled.a`
    flex: 1;
    justify-content: "center";
    align-items: "center";
    color :'white';
    font-size: "0.8rem";
    text-align: "center";
    margin-bottom:'22px';
`; */

const StyledFooterLink = styled.a`
    font-size: 10px;
    color: white;
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
    const [openAvatar, setOpenAvatar] = useState(false);

    /* const checkPermission = async () => {
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
    }; */

    const getConnections = async () => {
        const data = await companyService.getConnections();
        setWalletData(data);
        return;
        /* const invitation_ids: any = {};
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
        } */
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
        const certificates = (data.certificates || []).map( (x:any) => x.credential_exchange_id);
        setCertificates(certificates);
        console.log({ data });
    }

    useEffect(() => {
        setTimeout(() => {
            getConnections();
            getCertificates()
        }, 500)
    }, []);

    useEffect(() => {
        console.log("Here", certificates);
        if (certificates.length > 0) {
            (async () => {
                const exchangeId = certificates[certificates.length - 1];
                if (exchangeId) {
                    const data = await companyService.checkCertificate(exchangeId);
                    setLastCertificateData(data);
                }
            })();


        }
    }, [certificates.join(',')])

    const screens = useBreakpoint();
    const isMobile = screens['xs'] ? true : false;

    return (
        <div style={{ backgroundColor: "#F5F5F5", height: "100%" }}>
            <div style={{ maxWidth: '1080px', margin: 'auto' }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <StyledHeaderCardDefault >
                            <Row style={{ 'alignItems': 'center' }}>
                                <Col lg={1} md={1} sm={1} xs={1}>
                                    <img src={headerLogo} style={{ width: "80px", marginLeft: "-10px" }} alt="header" />
                                </Col>
                                <Col lg={10} md={20} sm={20} xs={20}>
                                    {!isMobile ? <StyledCompanyHeader>MyCompany Portal</StyledCompanyHeader> : <StyledCompanyHeaderMobile>MyCompany Portal</StyledCompanyHeaderMobile>}
                                </Col>
                                <Col lg={2} md={3} sm={3} xs={3} offset={!isMobile ? 5 : 0}>
                                    <div>
                                        <div id="UserAvatar">
                                            <Avatar size={!isMobile ? 110 : 50} icon={<UserOutlined />} onClick={() => { setOpenAvatar(true); }} />
                                        </div>
                                        {isMobile ? <Popover
                                            placement="bottom-end"
                                            isOpen={openAvatar}
                                            toggle={() => { setOpenAvatar(!openAvatar); }}
                                            target="UserAvatar"
                                            className="p-0 border-0"
                                            style={{ minWidth: 250 }}>
                                            <PopoverBody className="p-0">
                                                <ReactStrapCard inverse className={"bg-gradient-theme border-primary"}>
                                                    <CardBody className="d-flex justify-content-center align-items-center flex-column text-center">
                                                        <Avatar size={70} icon={<UserOutlined />} />
                                                        <CardTitle>{'Johan Eriksson'}</CardTitle>
                                                        <CardSubtitle><small>{'Bygg AB'}</small></CardSubtitle>
                                                    </CardBody>
                                                    <ListGroup flush>
                                                        <ListGroupItem tag="button" action className="border-0 border-light bg-light" onClick={onLogoutClick}>
                                                            <LogoutOutlined /> Logout
                                                        </ListGroupItem>
                                                    </ListGroup>
                                                </ReactStrapCard>
                                            </PopoverBody>
                                        </Popover> : null}
                                    </div>
                                </Col>
                                {!isMobile ? <Col span={6} style={{ textAlign: 'right' }}>
                                    <Row>
                                        <Col span={24}>
                                            <StyledTextName>Johan Eriksson</StyledTextName>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <StyledMiddleText>Bygg AB</StyledMiddleText>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}><StyledTextLogout onClick={onLogoutClick}>Logout</StyledTextLogout></Col>
                                    </Row>
                                </Col> : null}
                            </Row>
                        </StyledHeaderCardDefault>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ marginLeft: "10px" }}>
                        <StyledTextH2>Welcome Johan Eriksson!</StyledTextH2>
                    </Col>
                </Row>
                <Row style={{ 'paddingTop': '20px' }} gutter={[16, 16]}>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <StyledCardDefault >
                            <Row className='text-center'>
                                <StyledTextH1>Certificate of registration and register extract</StyledTextH1>
                            </Row>
                            <Row>
                                <StyledButton type="primary" block size={"large"}
                                    onClick={showRequestCredentialsDrawer}
                                    disabled={lastCertificateData?.state !== 'credential_acked'}>
                                    Request Now
                                </StyledButton>
                            </Row>
                             {
                                lastCertificateData?.state !== 'credential_acked' && 
                                <Row style={{ 'textAlign': 'center' }}>
                                    <div style={{ color: "green", fontSize: "10px", marginLeft: 'auto', marginRight: 'auto', paddingTop: "10px" }}>
                                        Your request is being processed. Once processed, your configured wallet will be notified.
                                    </div>
                                </Row>
                            }
                        </StyledCardDefault>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24}>
                        <StyledCardDefault>
                            <Row style={{ 'position': 'absolute', 'top': '20px', 'right': '20px' }}>
                                <Space>
                                    <BellOutlined style={{ fontSize: '30px' }} onClick={showViewCredentialsDrawer} />
                                    <SettingOutlined style={{ fontSize: '30px' }} onClick={showWalletConfigurationsDrawer} />
                                </Space>
                            </Row>
                            <Row>
                                <Col>
                                    &nbsp;
                                </Col>
                            </Row>
                            <Row>
                                <Col span={1} offset={7}>
                                    <img src={walletIcon} alt={'wallet'} />
                                </Col>
                                <Col span={12} offset={1} onClick={showWalletDetailsDrawer}>
                                    <StyledTextH1 style={{ marginTop: '16px', marginLeft: '30px' }}>My Wallet</StyledTextH1>
                                </Col>
                            </Row>
                            <Row style={{ 'textAlign': 'center' }}>
                                <Col span={24}>
                                    <div style={{ color: "green", fontSize: "10px" }}>
                                        New certificate in your wallet. Click to view.
                                    </div>
                                </Col>
                            </Row>
                        </StyledCardDefault>
                    </Col>
                </Row>
            </div>
            <FooterView />
            <RequestCredentialsPage onClose={onRequestCredentialsDrawerClose} open={openRequestCredentialsDrawer} getCertificates={getCertificates} />
            <WalletDetailsPage onClose={onWalletDetailsDrawerClose} open={openWalletDetailsDrawer} walletData={walletData} />
            <WalletConfigurationsPage onClose={onWalletConfigurationsDrawerClose} open={openWalletConfigurationsDrawer} />
            <ViewCredentialsPage onClose={onViewCredentialsDrawerClose} open={openViewCredentialsDrawer} showViewSelectedCredentialDrawer={showViewSelectedCredentialDrawer} />
            <ViewSelectedCredentialPage onClose={onViewSelectedCredentialDrawerClose} open={openViewSelectedCredentialDrawer} showViewCredentialsDrawer={showViewCredentialsDrawer}
                data={lastCertificateData.credential_proposal_dict?.credential_proposal?.attributes || []} />
        </div>
    );
};

export default LandingPage;