import { Col, Row, Card, Input, Avatar, Space, Select, Carousel, Popover, Divider, notification } from 'antd';
import { SettingOutlined, DownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import RequestCredentialsPage from "../requestcredentials";
import WalletDetailsPage from '../walletdetails';
import WalletConfigurationsPage from '../walletconfigurations';
import ViewCredentialsPage from '../viewcredentials';
import styled from "styled-components";
import authService from 'services/authService';
import { useHistory } from "react-router-dom";
import FooterView from 'views/components/footer';
import headerLogo from '../../../../assets/img/icons/pob_logo.png';
import walletIcon from '../../../../assets/img/icons/wallet.png';
import bolagsverketLogo from '../../../../assets/img/icons/bolagsverket.png';
import skatteverketLogo from '../../../../assets/img/icons/skatteverket_logo.jpg'
import companyService from '../../../../services/companyService';
import { BOLAGSVERKET_ID, SKATTEVERKET_ID } from 'configs/AppConfig';
import './index.scss';
import ViewSelectedCredentialPage from '../viewselectedcredential';

const { Search } = Input;

const { Option } = Select;

const StyledLayout = styled.div`
    background-color: #F5F5F5;
    height: 100%;
`;

const StyledCardDefault = styled(Card)`
    border-radius: 1.25rem;
    height: 220px;
`;

const StyledSubheaderText = styled.div`
    font-size: 18px;
    font-weight: 500;
`;

const StyledCompanyHeader = styled.div`
    font-size: 20px;
    font-weight: 500;
`;

const StyledCompanyLogo = styled.img`
    width: 30px;
`;

const StyledSubHeaderCard = styled(Card)`
    .ant-card-body {
        padding-left: 0px;
        padding-right: 0px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
`;

const StyledUserName = styled.div`
    font-size: 18px;
    font-weight: 500;
`;

const StyledSubUserName = styled.div`
    font-size: 14px;
`;

const StyledMyWalletTitle = styled.div`
    font-size: 18px;
    cursor: pointer;
`;

const StyledMyWalletSubTitle = styled.div`
    font-size: 14px;
`;

const StyledSettingOutlined = styled(SettingOutlined)`
    font-size: 30px;
`;

const StyledRequestCompanyCertificateTitle = styled.div`
    font-size: 18px;
`;

const StyledCredentialIssuerSelect = styled(Select)`
    width: 250px;
`;

const StyledCarouselCard = styled(Card)`
    border-radius: 1.25rem;
    height: 90px;
    border: 1px solid black;
    cursor: pointer;
`;

const StyledCarouselCardTitle = styled.div`
    font-size: 12px;
    font-weight: bold;
`;

const StyledCarouselCardSubTitle = styled.div`
    font-size: 11px;
`;

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    margin-top: 55px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: black;
  }
  > .slick-dots li.slick-active button {
    margin-top: 50px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: white;
    border: 4px solid black;
  }
`;

const StyledAccountPopoverTitle = styled.div`
    font-size: 15px;
    font-weight: bold;
`;

const StyledAccountPopoverSubTitle = styled.div`
    font-size: 15px;
`;

const StyledPopoverLogout = styled.div`
    color: blue;
    font-size: 15px;
    cursor: pointer;
`;

const StyledRequestCredentialProgressMessage = styled.div`
    color: green;
    font-size: 10px;
`;

export const LandingPage = () => {
    const [openRequestCredentialsDrawer, setOpenRequestCredentialsDrawer] = useState(false);
    const [openWalletDetailsDrawer, setOpenWalletDetailsDrawer] = useState(false);
    const [openWalletConfigurationsDrawer, setOpenWalletConfigurationsDrawer] = useState(false);
    const [openViewCredentialsDrawer, setOpenViewCredentialsDrawer] = useState(false);
    const [openViewSelectedCredentialsDrawer, setOpenViewSelectedCredentialsDrawer] = useState(false);
    const [schemasById, setSchemasById] = useState<any>({});
    const [carouselSchemaList, setCarouselSchemaList] = useState<any[]>([]);
    const [issuerSelected, setIssuerSelected] = useState('allissuersSchemasById');
    const [selectedOrganisationId, setSelectedOrganisationId] = useState<string>('');
    const [selectedSchemaId, setSelectedSchemaId] = useState<string>('');
    const [selectedSchemaTitle, setSelectedSchemaTitle] = useState<string>('');
    const [credentialRequestProgressMessage, setCredentialRequestProgressMessage] = useState<string>('');
    const [selectedViewCredentialAttributes, setSelectedViewCredentialAttributes] = useState<any>({});
    const [walletData, setWalletData] = useState({});
    const [certificates, setCertificates] = useState<string[]>([]);
    const [lastCertificateData, setLastCertificateData] = useState<any>({});
    const history = useHistory();

    useEffect(() => {
        fetchSchemasByIdAndUpdateCarouselSchemaList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateCarouselSchemaList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issuerSelected, schemasById]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [certificates.join(',')])


    const getConnections = async () => {
        const data = await companyService.getConnections();
        setWalletData(data);
        return;
    };

    const getCertificates = async () => {
        const data = await companyService.getCertificates();
        const certificates = (data.certificates || []).map((x: any) => x.credential_exchange_id);
        setCertificates(certificates);
        console.log({ data });
    }

    const openNotification = (message: string, description: string) => {
        notification['success']({ message, description });
    };

    const fetchSchemasByIdAndUpdateCarouselSchemaList = async () => {
        await fetchSchemaIds();
        // updateCarouselSchemaList();
    };

    const fetchSchemaIds = async () => {
        const bolagsverketSchemasResponse = await companyService.getCertificateSchemaIdByOrganisationId(BOLAGSVERKET_ID);
        const bolagsverketSchemasById = bolagsverketSchemasResponse.map((item: string) => { return `${item}%${BOLAGSVERKET_ID}` });
        const skatteverketSchemasresponse = await companyService.getCertificateSchemaIdByOrganisationId(SKATTEVERKET_ID);
        const skatteverketSchemasById = skatteverketSchemasresponse.map((item: string) => { return `${item}%${SKATTEVERKET_ID}` });
        setSchemasById({ bolagsverketSchemasById, skatteverketSchemasById });
    };

    const capitalizeFirstLetter = (data: string) => {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    const updateCarouselCards = (carouselSchemaList: any[]) => {
        const carouselCardArray = carouselSchemaList.map((item: any) => {
            return (
                <Row >
                    <Col span={carouselSchemaList.length === 1 ? 7 : 22} offset={carouselSchemaList.length === 1 ? 0 : 1}>
                        <StyledCarouselCard onClick={() => {
                            setSelectedOrganisationId(item.organisationId);
                            setSelectedSchemaId(item.schemaId);
                            setSelectedSchemaTitle(item.title);
                            showRequestCredentialsDrawer();
                        }}>
                            <Row>
                                <Col span={20}>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <StyledCarouselCardTitle>{item.title}</StyledCarouselCardTitle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <StyledCarouselCardSubTitle>{item.subTitle}</StyledCarouselCardSubTitle>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={2} offset={2}>
                                    <img src={item.logo} style={{ width: "30px" }} alt="credential" />
                                </Col>
                            </Row>
                        </StyledCarouselCard>
                    </Col>
                </Row>);
        });
        setCarouselSchemaList(carouselCardArray);
    }

    const updateCarouselSchemaList = () => {
        let carouselSchemaListVariable = [];
        // console.log(schemasById);
        if (schemasById[issuerSelected] !== undefined) {
            carouselSchemaListVariable = schemasById[issuerSelected];
        } else {
            let schemasByIdListTemp: any[] = [];
            for (let item in schemasById) {
                schemasByIdListTemp = schemasByIdListTemp.concat(schemasById[item]);
            }
            carouselSchemaListVariable = schemasByIdListTemp;
        }
        const carouselSchemaListTemp = carouselSchemaListVariable.map((item: string) => {
            const issuerID = item.split(':')[3].split('%')[1]
            const issuer = issuerID === BOLAGSVERKET_ID ? 'Bolagsverket' : 'Skatteverket'
            const logo = issuerID === BOLAGSVERKET_ID ? bolagsverketLogo : skatteverketLogo
            return { 
                title: item.split('%')[0].split(':')[2], 
                subTitle: `Issued by: ${capitalizeFirstLetter(issuer)}, Sweden`, 
                schemaId: item.split('%')[0], organisationId: item.split('%')[1] ,
                logo
            };
        });
        // console.log(carouselSchemaListTemp);
        updateCarouselCards(carouselSchemaListTemp);
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

    const showViewSelectedCredentialDrawer = () => {
        setOpenViewSelectedCredentialsDrawer(true);
    };

    const onViewSelectedCredentialDrawerClose = () => {
        setOpenViewSelectedCredentialsDrawer(false);
    };

    const onSearch = (value: string) => console.log(value);

    const handleChange = (value: string) => {
        setIssuerSelected(value);
    };

    const onRequestCredentialSubmit = (organisationId: string, schemaId: string) => {
        console.log(organisationId);
        console.log(schemaId);
        setCredentialRequestProgressMessage('Your request is being processed. Once processed, your configured wallet will be notified.');
        setTimeout(() => {
            setCredentialRequestProgressMessage('');
            openNotification('Successfully requested credentials', 'New certificate in your wallet. Click your wallet to view.');
        }, 5000);
    }

    const accountPopOverContent = () => {
        return (
            <div className='account-popup-content'>
                <Row>
                    <Col style={{ textAlign: 'center' }} span={24}>
                        <StyledAccountPopoverTitle>Bygg AB</StyledAccountPopoverTitle>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: 'center' }} span={24}>
                        <StyledAccountPopoverSubTitle>Finance AB</StyledAccountPopoverSubTitle>
                    </Col>
                </Row>
                <Row>
                    <Divider />
                </Row>
                <Row>
                    <Col style={{ textAlign: 'center' }} span={24}>
                        <StyledPopoverLogout onClick={onLogoutClick}>Sign Out</StyledPopoverLogout>
                    </Col>
                </Row>
            </div>
        );
    }

    return (
        <StyledLayout>
            <div className='fix-width'>
                <Row gutter={[16, 16]}>
                    <Col span={24} className="max-width-1080 mt-16">
                        <Row>
                            <Col md={12} xs={24}>
                                <Space>
                                    <StyledCompanyLogo src={headerLogo} alt="header" />
                                    <StyledCompanyHeader>MyCompany Wallet Portal</StyledCompanyHeader>
                                </Space>
                            </Col>
                            <Col md={6} offset={6} xs={0}>
                                <Search />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="mt-16">
                    <Col span={24}>
                        <StyledSubHeaderCard>
                            <Row gutter={16}>
                                <Col span={24} className="max-width-1080">
                                    <Row>
                                        <Col md={12} xs={21}>
                                            <StyledSubheaderText>Welcome Johan Eriksson!</StyledSubheaderText>
                                        </Col>
                                        <Col md={12} xs={0}>
                                            <Row>
                                                <Col span={24} style={{ textAlign: 'right' }}>
                                                    <Space className='user-legend' align='start'>
                                                        <div>
                                                            <StyledUserName>Johan Eriksson</StyledUserName>
                                                            <StyledSubUserName>Bygg AB</StyledSubUserName>
                                                        </div>

                                                        <Popover placement="bottomRight" content={accountPopOverContent()} trigger="click" overlayClassName='account-popup' className='menu-dropdown'>
                                                            <DownOutlined />
                                                        </Popover>
                                                    </Space>
                                                </Col>

                                            </Row>

                                        </Col>
                                        <Col xs={3} md={0} style={{ textAlign: 'right' }}>
                                            <Popover placement="bottomRight" content={accountPopOverContent()} trigger="click" overlayClassName='account-popup'>
                                                <Avatar />
                                            </Popover>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </StyledSubHeaderCard>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24} className="max-width-1080 mt-16">
                        <Row gutter={[16, 16]}>
                            <Col md={12} xs={24}>
                                <StyledCardDefault>
                                    <Row style={{ marginBottom: '10px', marginTop: '50px' }}>
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            <StyledRequestCompanyCertificateTitle>Request Company Certificate</StyledRequestCompanyCertificateTitle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            <StyledCredentialIssuerSelect defaultValue="allissuersSchemasById" onChange={(value) => { handleChange(value as string); }} showSearch>
                                                <Option value="allissuersSchemasById">All Issuers</Option>
                                                <Option value="bolagsverketSchemasById">Bolagsverket, Sweden</Option>
                                                <Option value="skatteverketSchemasById">Skatteverket, Sweden</Option>
                                            </StyledCredentialIssuerSelect>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            <StyledRequestCredentialProgressMessage>{credentialRequestProgressMessage}</StyledRequestCredentialProgressMessage>
                                        </Col>
                                    </Row>
                                </StyledCardDefault>
                            </Col>
                            <Col md={12} xs={24}>
                                <StyledCardDefault>
                                    <Row>
                                        <Col span={2} offset={22}>
                                            <StyledSettingOutlined onClick={showWalletDetailsDrawer} />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '30px' }} justify="center">
                                        <Col style={{ cursor: 'pointer' }} onClick={showViewCredentialsDrawer}>
                                            <Space>
                                                <img src={walletIcon} alt={'wallet_icon'} />
                                                <div>
                                                    <StyledMyWalletTitle>MyCompany Wallet</StyledMyWalletTitle>
                                                    <StyledMyWalletSubTitle>Bygg AB</StyledMyWalletSubTitle>
                                                </div>
                                            </Space>
                                        </Col>

                                    </Row>
                                </StyledCardDefault>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24} className="max-width-1080 mt-16">
                        <CarouselWrapper slidesToShow={carouselSchemaList.length === 1 ? 1 : 3} dots={true} arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />}>
                            {carouselSchemaList}
                        </CarouselWrapper>
                    </Col>
                </Row>
            </div>
            <FooterView />
            <RequestCredentialsPage onClose={onRequestCredentialsDrawerClose} open={openRequestCredentialsDrawer} organisationId={selectedOrganisationId} schemaId={selectedSchemaId} schemaTitle={selectedSchemaTitle} onRequestCredentialSubmit={onRequestCredentialSubmit} />
            <WalletDetailsPage onClose={onWalletDetailsDrawerClose} open={openWalletDetailsDrawer} showWalletConfigurationsDrawer={showWalletConfigurationsDrawer} walletData={walletData} />
            <WalletConfigurationsPage onClose={onWalletConfigurationsDrawerClose} open={openWalletConfigurationsDrawer} showWalletDetailsDrawer={showWalletDetailsDrawer} />
            <ViewCredentialsPage onClose={onViewCredentialsDrawerClose} open={openViewCredentialsDrawer} showViewSelectedCredentialDrawer={showViewSelectedCredentialDrawer} setSelectedViewCredentialAttributes={setSelectedViewCredentialAttributes} />
            <ViewSelectedCredentialPage onClose={onViewSelectedCredentialDrawerClose} open={openViewSelectedCredentialsDrawer} selectedViewCredentialAttributes={selectedViewCredentialAttributes} onViewCredentialsDrawerClose={onViewCredentialsDrawerClose} />
        </StyledLayout>
    );
};

export default LandingPage;