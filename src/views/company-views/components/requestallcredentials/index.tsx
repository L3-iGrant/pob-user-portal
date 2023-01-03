import { Drawer, Button, Row, Checkbox,Card,Space,Col } from 'antd';
import {useState } from 'react';
import companyService from 'services/companyService';
import styled from "styled-components";
import bolagsverketLogo from '../../../../assets/img/icons/bolagsverket.png';
import {CloseCircleOutlined} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { updateIsLoadingForFetchStoredCertificates } from 'views/company-views/companySlice';
import { useTranslation } from 'react-i18next';

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledButton = styled(Button)`
   
`;

const StyledLink = styled.a`
    color: #40a9ff;
    font-weght: bold;
`;


const camelToTitle = (camelCase: string) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export const RequestAllCredentialsPage = (props: { onClose: any; open: boolean; onRequestCredentialSubmit: any; showWalletDetailsDrawer: any; issuer: any;}) => {
    const [submitLoader, setSubmitLoader] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={props.onClose}>{t("Cancel")}</Button>
                    </StyledActionButton>
                </Row>
                <Row>
                    <StyledActionButton>
                        <StyledButton loading={submitLoader} type="primary" block size={"middle"} onClick={async () => {
                            setSubmitLoader(true);

                            const response = await companyService.submitAllCredentialRequest();
                            setSubmitLoader(false);
                            if (response) {
                                dispatch(updateIsLoadingForFetchStoredCertificates(true))
                                props.onClose();
                                props.onRequestCredentialSubmit();
                            }
                        }}>{t("Submit")}</StyledButton>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title={t("REQUEST CREDENTIALS")} placement="right" closable={false} onClose={props.onClose} open={props.open} footer={footerActionButtons()}
         extra={
            <CloseCircleOutlined onClick={props.onClose}/>
         }>
            <p>
            {`${t('You are about to request all available company credentials')}. ${t('Confirm the details below and click submit the request to issue credentials.')}`}
            </p>
            <p>{t("Once submitted, the requested credentials will be issued to the")} <StyledLink onClick={()=>{
                props.showWalletDetailsDrawer();
                props.onClose();
            }}>{t("configured wallet")}</StyledLink>.</p>
            <Row style={{ marginTop: "5px" }}>
                <Card style={{ width: "100%", border: "0", backgroundColor: "#f7f6f6" }}>
                    <Space direction='vertical' size={"large"} style={{ width: "100%" }}>

                        <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                            <Col span={4} style={{ display: "flex", justifyContent: "center" }}><Checkbox defaultChecked
                                disabled /></Col>
                            <Col span={20}>
                                <Card bodyStyle={{ padding: "14px" }} style={{ width: "100%", borderRadius: "24px", border: "0.5px solid #000000" }}>
                                    <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                                        <Col span={24}>
                                            <div>CERTIFICATE OF REGISTRATION</div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                                        <Col span={18}>
                                            <div style={{ fontWeight: "bold" }}>Bygg AB, Sweden</div>
                                            <div style={{ fontSize: "12px" }}>{t('Issued by')}: <span style={{ fontStyle: "italic" }}>Bolagsverket, Sweden</span></div>
                                        </Col>
                                        <Col span={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src={bolagsverketLogo} style={{ width: "30px" }} alt="credential" />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                            <Col span={4} style={{ display: "flex", justifyContent: "center" }}><Checkbox defaultChecked
                                disabled /></Col>
                            <Col span={20}>
                                <Card bodyStyle={{ padding: "14px" }} style={{ width: "100%", borderRadius: "24px", border: "0.5px solid #000000" }}>
                                    <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                                        <Col span={24}>
                                            <div>ECOLABEL</div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                                        <Col span={18}>
                                            <div style={{ fontWeight: "bold" }}>Bygg AB, Sweden</div>
                                            <div style={{ fontSize: "12px" }}>{t('Issued by')}: <span style={{ fontStyle: "italic" }}> Örnen, Sweden</span>
                                            </div>
                                        </Col>
                                        <Col span={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src='https://staging-api.igrant.io/v1/organizations/638f5b102f5d17000144320f/image/63909c302f5d170001443214/web' style={{ width: "40px" }} alt="credential" />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                            <Col span={4} style={{ display: "flex", justifyContent: "center" }}><Checkbox defaultChecked
                                disabled /></Col>
                            <Col span={20}>
                                <Card bodyStyle={{ padding: "14px" }} style={{ width: "100%", borderRadius: "24px", border: "0.5px solid #000000" }}>
                                    <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                                        <Col span={24}>
                                            <div>REAL ESTATE INSURANCE</div>
                                        </Col>
                                    </Row>
                                    <Row gutter={[16, 16]} style={{ display: "flex", alignItems: "center" }}>
                                        <Col span={18}>
                                            <div style={{ fontWeight: "bold" }}>Bygg AB, Sweden</div>
                                            <div style={{ fontSize: "12px" }}>{t('Issued by')}: <span style={{ fontStyle: "italic" }}>Fria försäkringar, Sweden</span>
                                            </div>
                                        </Col>
                                        <Col span={6} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <img src='https://staging-api.igrant.io/v1/organizations/638f370c2f5d17000144320a/image/63909baf2f5d170001443213/web' style={{ width: "40px" }} alt="credential" />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Space>
                </Card>
            </Row>
        </Drawer>
    );
};

export default RequestAllCredentialsPage;