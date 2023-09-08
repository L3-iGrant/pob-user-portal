import { Col, Row, Card, Input, Avatar, Space, Select, Carousel, Popover, Divider, notification,Tooltip ,Button} from 'antd';
import { SettingOutlined, DownOutlined, LeftOutlined, RightOutlined, MenuOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import RequestCredentialsPage from "../requestcredentials";
import RequestAllCredentialsPage from "../requestallcredentials";
import WalletDetailsPage from '../walletdetails';
import WalletConfigurationsPage from '../walletconfigurations';
import ViewCredentialsPage from '../viewcredentials';
import styled from "styled-components";
import authService from 'services/authService';
import { useHistory } from "react-router-dom";
import FooterView from 'views/components/footer';
import headerLogo from '../../../../assets/img/icons/pob_logo_1.png';
import walletIcon from '../../../../assets/img/icons/wallet.png';
import walletFullIcon from '../../../../assets/img/icons/wallet-full.png';
import bolagsverketLogo from '../../../../assets/img/icons/bolagsverket.png';
import skatteverketLogo from '../../../../assets/img/icons/skatteverket_logo.jpg'
import companyService from '../../../../services/companyService';
import { BOLAGSVERKET_ID, FRIA_ID, ORNEN_ID, SKATTEVERKET_ID } from 'configs/AppConfig';
import './index.scss';
import ViewSelectedCredentialPage from '../viewselectedcredential';
import { useListStoredCertificatesQuery } from 'services/company.rtk';
import { useSelector } from 'react-redux';
import { selectFetchStoredCertificates, selectWalletEmpty } from 'views/company-views/companySlice';
import { useTranslation } from 'react-i18next';
import { Grid } from 'antd';
import loginIcon from '../../../../assets/img/login/arrow.png';

const { useBreakpoint } = Grid;

const { Search } = Input;

const { Option } = Select;

const StyledLayout = styled.div`
    background-color: #F5F5F5;
    height: 100%;
`;
const StyledButton = styled(Button)`
`;
const StyledCardDefault = styled(Card)`
    border-radius: 1.25rem;
    height: 220px;
`;

const StyledSubheaderText = styled.div`
    font-size: 16px;
    font-weight: 500;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const StyledLogoText = styled.div`
    font-size: 16px;
    font-weight: 500;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    color: white;
    padding-top:8px;
`;

const StyledLink = styled.a`
color: #40a9ff;
`;

const StyledCompanyHeader = styled.div`
    padding-top:5px;
    color:white;
    font-size: 18px;
    font-weight: 600;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const StyledCompanyLogo = styled.img`
    width: 190px;
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
    font-size: 16px;
    font-weight: 500;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const StyledSubUserName = styled.div`
    font-size: 14px;
`;

const StyledMyWalletTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const StyledMyWalletSubTitle = styled.div`
    font-size: 14px;
`;

const StyledSettingOutlined = styled(SettingOutlined)`
    font-size: 30px;
`;

const StyledRequestCompanyCertificateTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
`;

const StyledCredentialIssuerSelect = styled(Select)`
    width: 200px;
`;

const StyledCarouselCard = styled(Card)`
    border-radius: 1.25rem;
    height: auto;
    border: 1px solid black;
    cursor: pointer;
`;

const StyledCarouselCardTitle = styled.div`
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    width: 220px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const StyledCarouselCardSubTitle = styled.div`
    font-size: 11px;
`;

const CarouselWrapper = styled(Carousel)`
    bacground-color: #F5F5F5;
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
    color: gray;
`;

const StyledPopoverLogout = styled.div`
    color: blue;
    font-size: 15px;
    cursor: pointer;
`;

const StyledRequestCredentialProgressMessage = styled.div`
    color: green;
    font-size: 10px;
    margin-top: 6px;
`;

export const LandingPage = () => {
    const [openRequestCredentialsDrawer, setOpenRequestCredentialsDrawer] = useState(false);
    const [openRequestAllCredentialsDrawer, setOpenRequestAllCredentialsDrawer] = useState(false);
    const [openWalletDetailsDrawer, setOpenWalletDetailsDrawer] = useState(false);
    const [openWalletConfigurationsDrawer, setOpenWalletConfigurationsDrawer] = useState(false);
    const [openViewCredentialsDrawer, setOpenViewCredentialsDrawer] = useState(false);
    const [openViewSelectedCredentialsDrawer, setOpenViewSelectedCredentialsDrawer] = useState(false);
    const [schemasById, setSchemasById] = useState<any>({});
    const [carouselSchemaList, setCarouselSchemaList] = useState<any[]>([]);
    const [issuerSelected, setIssuerSelected] = useState('allissuersSchemasById');
    const [selectedOrganisationId, setSelectedOrganisationId] = useState<string>('');
    const [selectedSchemaId, setSelectedSchemaId] = useState<string>('');
    const [selectedIssuer, setSelectedIssuer] = useState<string>('');
    const [selectedSchemaTitle, setSelectedSchemaTitle] = useState<string>('');
    const [credentialRequestProgressMessage, setCredentialRequestProgressMessage] = useState<any>('');
    const [selectedViewCredentialAttributes, setSelectedViewCredentialAttributes] = useState<any>({});
    const [selectedViewCredentialReferent, setSelectedViewCredentialReferent] = useState<any>('');
    const [walletData, setWalletData] = useState({});
    const [defaultWalletData, setDefaultWalletData] = useState({});
    const [certificates, setCertificates] = useState<string[]>([]);
    const [lastCertificateData, setLastCertificateData] = useState<any>({});
    const history = useHistory();
    const fetchStoredCertificates = useSelector(selectFetchStoredCertificates)
    const walletEmpty = useSelector(selectWalletEmpty)
    const { data, error, isLoading } = useListStoredCertificatesQuery(undefined, {
        pollingInterval: fetchStoredCertificates.pollingInterval,
    })
    const { t, i18n } = useTranslation<string>('');
    const { xs } = useBreakpoint();

    useEffect(() => {
        fetchSchemasByIdAndUpdateCarouselSchemaList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("Data: ", data);
    }, [data])

    useEffect(() => {
        updateCarouselSchemaList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [issuerSelected, schemasById]);

    useEffect(() => {
        setTimeout(() => {
            getDefaultConnections();
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
        if (data) setWalletData(data);
    };

    const getDefaultConnections = async () => {
        const data = await companyService.getDefaultConnections();
        if (data) setDefaultWalletData(data);
    }

    const getCertificates = async () => {
        const data = await companyService.getCertificates();
        const certificates = (data.certificates || []).map((x: any) => x.credential_exchange_id);
        setCertificates(certificates);
        console.log({ data });
    }

    const openSuccessNotification = (message: string, description: string) => {
        notification.success({ message, description });
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
        const friaSchemasresponse = await companyService.getCertificateSchemaIdByOrganisationId(FRIA_ID);
        const friaSchemasById = friaSchemasresponse.map((item: string) => { return `${item}%${FRIA_ID}` });
        const ornenSchemasresponse = await companyService.getCertificateSchemaIdByOrganisationId(ORNEN_ID);
        const ornenSchemasById = ornenSchemasresponse.map((item: string) => { return `${item}%${ORNEN_ID}` });
        setSchemasById({ bolagsverketSchemasById, skatteverketSchemasById, friaSchemasById, ornenSchemasById });
    };

    const capitalizeFirstLetter = (data: string) => {
        return data.charAt(0).toUpperCase() + data.slice(1);
    }

    const updateCarouselCards = (carouselSchemaList: any[]) => {
        // Need page refresh for span to be reflected.
        let colProps = xs ? {
            span: 24
        } : {
            span: carouselSchemaList.length === 1 ? 10 : 22
        }

        const carouselCardArray = carouselSchemaList.map((item: any) => {
            return (
                <>
                    <Col {...colProps} offset={carouselSchemaList.length === 1 ? 0 : 1}>
                        <StyledCarouselCard onClick={() => {
                            setSelectedOrganisationId(item.organisationId);
                            setSelectedSchemaId(item.schemaId);
                            setSelectedSchemaTitle(item.title);
                            setSelectedIssuer(item.issuer);
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
                </>
            );
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
            let issuer = '';
            let logo = '';
            switch (issuerID) {
                case BOLAGSVERKET_ID:
                    issuer = 'Bolagsverket'
                    logo = bolagsverketLogo
                    break;
                case SKATTEVERKET_ID:
                    issuer = 'Skatteverket'
                    logo = skatteverketLogo
                    break;
                case ORNEN_ID:
                    issuer = 'Örnen'
                    logo = 'https://staging-api.igrant.io/v1/organizations/638f5b102f5d17000144320f/image/63909c302f5d170001443214/web'
                    break;
                case FRIA_ID:
                    issuer = 'Fria försäkringar'
                    logo = 'https://staging-api.igrant.io/v1/organizations/638f370c2f5d17000144320a/image/63909baf2f5d170001443213/web'
                    break;
            }

            // const issuer = issuerID === BOLAGSVERKET_ID ? 'Bolagsverket' : 'Skatteverket'
            // const logo = issuerID === BOLAGSVERKET_ID ? bolagsverketLogo : skatteverketLogo
            return {
                title: item.split('%')[0].split(':')[2],
                issuer: `${capitalizeFirstLetter(issuer)}, Sweden`,
                subTitle: `${t('Issued by')}: ${capitalizeFirstLetter(issuer)}, Sweden`,
                schemaId: item.split('%')[0], organisationId: item.split('%')[1],
                logo
            };
        });
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

    const showRequestAllCredentialsDrawer = () => {
        setOpenRequestAllCredentialsDrawer(true);
    };

    const onRequestAllCredentialsDrawerClose = () => {
        setOpenRequestAllCredentialsDrawer(false);
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
        setCredentialRequestProgressMessage(t('Your request is being processed. Once processed, your configured wallet will be notified.'));
        setTimeout(() => {
            setCredentialRequestProgressMessage('');
            openSuccessNotification(t('Successfully requested credentials'), t('New certificate in your wallet. Click your wallet to view.'));
        }, 5000);
    }

    const onRequestAllCredentialSubmit = () => {
        setCredentialRequestProgressMessage(t('Your request is being processed. Once processed, your configured wallet will be notified.'));
        setTimeout(() => {
            setCredentialRequestProgressMessage('');
            openSuccessNotification(t('Successfully requested credentials'), t('New certificate in your wallet. Click your wallet to view.'));
        }, 5000);
    }
    const contentStyle: React.CSSProperties = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

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
                        <StyledAccountPopoverSubTitle>Solceller AB</StyledAccountPopoverSubTitle>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: 'center' }} span={24}>
                        <StyledPopoverLogout onClick={onLogoutClick}>{t('Sign Out')}</StyledPopoverLogout>
                    </Col>
                </Row>
            </div>
        );
    }

    var settings = {
        dots: true,
        infinite: false,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <StyledLayout>
            <div className='fix-width'>
                <Row gutter={[16, 16]} style={{background: "#002857",paddingBottom:'20px'}}>
                    <Col span={24} className="max-width-1080 mt-16">
                        <Row>
                            <Col md={12} xs={24}>
                                <Space>
                                    <StyledCompanyLogo src={headerLogo} alt="header" />
                                    <StyledCompanyHeader>{t('MyCompany Wallet')}</StyledCompanyHeader>
                                    <StyledLogoText>(Powered by <StyledLink style={{margin:0}} target='_blank' href='https://igrant.io'>iGrant.io</StyledLink>)</StyledLogoText>
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
                                            <StyledSubheaderText>{t("Welcome")} Johan Eriksson!</StyledSubheaderText>
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
                                                <MenuOutlined size={18} />
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
                                <StyledCardDefault className="landing-card">
                                    <Row style={{ marginBottom: '10px', marginTop: '50px' }}>
                                        <Col span={24} style={{ textAlign: 'center' }}>
                                            <StyledRequestCompanyCertificateTitle>{t("Request Company Certificate")}</StyledRequestCompanyCertificateTitle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'center' }}>

                                            <StyledCredentialIssuerSelect defaultValue="allissuersSchemasById" onChange={(value) => { handleChange(value as string); }} showSearch>
                                                <Option value="allissuersSchemasById">{t("All Issuers")}</Option>
                                                <Option value="bolagsverketSchemasById">Bolagsverket, Sweden</Option>
                                                <Option value="friaSchemasById">Fria försäkringar, Sweden</Option>
                                                <Option value="ornenSchemasById">Örnen, Sweden</Option>
                                                <Option value="skatteverketSchemasById">Skatteverket, Sweden</Option>
                                            </StyledCredentialIssuerSelect>

                                            <Tooltip placement="topLeft"  trigger={"hover"} title={t("Request available company certificates")}>
                                                <span style={{cursor: 'pointer'}}>
                                                    <StyledButton type="link" disabled={issuerSelected !='allissuersSchemasById'}>
                                                    <div><img className='login-btn right-arrow' onClick={() => { showRequestAllCredentialsDrawer()}}
                                                    src={loginIcon} alt={'login_logo'}/></div>
                                                    </StyledButton>
                                                </span>
                                            </Tooltip>

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
                                <StyledCardDefault className="landing-card">
                                    <Row>
                                        <Col span={2} offset={22}>
                                            <StyledSettingOutlined onClick={showWalletDetailsDrawer} />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '30px' }} justify="center">
                                        <Col style={{ cursor: 'pointer' }} onClick={showViewCredentialsDrawer}>
                                            <Space>
                                                {
                                                    walletEmpty ?
                                                        <img src={walletIcon} alt={'wallet_icon'} /> :
                                                        <img src={walletFullIcon} alt={'wallet_icon'} />
                                                }
                                                <div>
                                                    <StyledMyWalletTitle>{t('MyCompany Wallet')}</StyledMyWalletTitle>
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
                    <Col span={24} className="mt-16 max-width-1080 pb-54"
                        style={{ "backgroundColor": '#F3FAFD' }}>
                        <CarouselWrapper slidesToShow={carouselSchemaList.length === 1 ? 1 : carouselSchemaList.length === 2 ? 2 : 3} arrows prevArrow={<LeftOutlined />} nextArrow={<RightOutlined />} {...settings}>
                            {carouselSchemaList}
                        </CarouselWrapper>
                    </Col>
                </Row>
                <div className="push"></div>
            </div>
            <FooterView />
            <RequestCredentialsPage onClose={onRequestCredentialsDrawerClose} open={openRequestCredentialsDrawer} organisationId={selectedOrganisationId} schemaId={selectedSchemaId} schemaTitle={selectedSchemaTitle} onRequestCredentialSubmit={onRequestCredentialSubmit} showWalletDetailsDrawer={showWalletDetailsDrawer} issuer={selectedIssuer} />
            <RequestAllCredentialsPage onClose={onRequestAllCredentialsDrawerClose} open={openRequestAllCredentialsDrawer} onRequestCredentialSubmit={onRequestAllCredentialSubmit} showWalletDetailsDrawer={showWalletDetailsDrawer} issuer={selectedIssuer} />
            <WalletDetailsPage onClose={onWalletDetailsDrawerClose} open={openWalletDetailsDrawer} showWalletConfigurationsDrawer={showWalletConfigurationsDrawer} walletData={walletData} defaultWalletData={defaultWalletData} />
            <WalletConfigurationsPage onClose={onWalletConfigurationsDrawerClose} open={openWalletConfigurationsDrawer} showWalletDetailsDrawer={showWalletDetailsDrawer} />
            <ViewCredentialsPage onClose={onViewCredentialsDrawerClose} open={openViewCredentialsDrawer} showViewSelectedCredentialDrawer={showViewSelectedCredentialDrawer} setSelectedViewCredentialAttributes={setSelectedViewCredentialAttributes} setSelectedViewCredentialReferent={setSelectedViewCredentialReferent} openViewSelectedCredentialsDrawer={openViewSelectedCredentialsDrawer} />
            <ViewSelectedCredentialPage onClose={onViewSelectedCredentialDrawerClose} open={openViewSelectedCredentialsDrawer} selectedViewCredentialAttributes={selectedViewCredentialAttributes} selectedViewCredentialReferent={selectedViewCredentialReferent} onViewCredentialsDrawerClose={onViewCredentialsDrawerClose} />
        </StyledLayout>
    );
};

export default LandingPage;