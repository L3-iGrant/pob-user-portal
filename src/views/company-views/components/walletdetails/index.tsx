import { Alert, Button, Drawer, Radio, Row, Space, Input, Col, Tooltip } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import { CloseCircleOutlined, CopyOutlined } from "@ant-design/icons";
import companyService from "../../../../services/companyService";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

const StyledWalletDiv = styled.div`
    font-size: 12px;
    font-weight: 400;
`;

const StyledAnchor = styled.a`
    font-size: 12px;
    font-weight: 400;
    color: blue !important;
`;

const StyledContainer = styled.div`
    margin-left: 24px;
`;

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

export const WalletDetailsPage = (props: { onClose: any; open: boolean; showWalletConfigurationsDrawer: any; walletData: any; defaultWalletData: any; }) => {

    const { defaultWalletData } = props;
    const [selectedValue, setSelectedValue] = useState('a');
    const [connectionUrl, setConnectionUrl] = useState<any>('');
    const [copied, setCopied] = useState(false);
    const walletData:any = {};
    const { t, i18n } = useTranslation();

    const createInvitation = async () => {
        const res = await companyService.createInvitation()
        if (res) {
            setConnectionUrl(res.invitation_url);
        }
    }

    useEffect(() => {
        setSelectedValue('a');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        createInvitation().then();
    }, [props.open]);

    const handleChange = (event: RadioChangeEvent) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'b' && Object.keys(walletData).length === 0) {
            props.onClose();
            props.showWalletConfigurationsDrawer();
        }
    };

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={() => {
                            props.onClose();
                        }}>{t("Cancel")}</Button>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title={t('MY WALLET - SETTINGS')} placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}
            closable={false} extra={
                <CloseCircleOutlined onClick={props.onClose} />
            }>
            <p>
            {t('This is the details of your company wallet which you can use to share your credentials with any third-party.')}
            </p>
            <p>
                <Radio.Group style={{width: "100%"}} onChange={handleChange} value={selectedValue}>
                    <Space direction="vertical" style={{width: "100%"}}>
                        <Row>
                            <Col span={24}>
                            <div>
                            <Radio value="a">{t('Default Wallet (Provided by Bolagsverket)')}</Radio>
                        </div>
                        {Object.keys(defaultWalletData).length !== 0 && selectedValue === 'a' ?
                            <StyledContainer style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                                height: '260px'
                            }}>
                                <p style={{ marginBottom: '0px' }}>
                                    <strong>{t('Wallet Details')}</strong>
                                </p>
                                <StyledWalletDiv>
                                {t('Agent URL')}: <StyledAnchor style={{wordBreak: 'break-word'}}>{defaultWalletData.agentServiceEndpoint}</StyledAnchor>
                                </StyledWalletDiv>
                                <StyledWalletDiv>{t('Ledger Name')}: {defaultWalletData.ledgerName}</StyledWalletDiv>
                                <StyledWalletDiv>{t('Ledger URL')}: <StyledAnchor target={"_blank"} href={defaultWalletData.ledgerURL}>{defaultWalletData.ledgerURL}</StyledAnchor></StyledWalletDiv>
                                <StyledWalletDiv style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <span>{t('Connection URL')}:</span>
                                        <CopyToClipboard 
                                            text={connectionUrl}
                                            onCopy={() => setCopied(true)}>
                                            <Tooltip placement="top" trigger={"click"} title={t("Copied")}>
                                                <span style={{cursor: 'pointer'}}>
                                                <Space>
                                                    <span>{t('Copy wallet link')}</span>   
                                                    <CopyOutlined style={{ fontSize: '18px' }}/> 
                                                </Space>
                                                </span>
                                            </Tooltip>
                                        </CopyToClipboard> 
                                </StyledWalletDiv>
                                <StyledWalletDiv><TextArea rows={4} bordered={true} style={{border: "0.5px solid black", fontSize: "12px"}} size={"large"} value={connectionUrl} /></StyledWalletDiv>
                                {/* <StyledWalletDiv style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                                    
                                </StyledWalletDiv> */}
                            </StyledContainer> : null}
                        <div style={{ marginTop: '10px' }}>
                            <Radio value="b">{Object.keys(walletData).length !== 0 ? t('Own External Wallet') : t('Own External Wallet')}</Radio>
                        </div>
                        {Object.keys(walletData).length !== 0 && selectedValue === 'b' ?
                            <StyledContainer>
                                <p style={{ marginBottom: '0px' }}>
                                    <strong>{t('Wallet Details')}</strong>
                                </p>
                                <StyledWalletDiv>
                                    <StyledAnchor>{walletData.AgentServiceEndpoint}</StyledAnchor>
                                </StyledWalletDiv>
                                <StyledWalletDiv>{t('Ledger Name')}: {walletData.LedgerName}</StyledWalletDiv>
                                <StyledWalletDiv>{t('Ledger URL')}: <StyledAnchor href={walletData.LedgerURL} target="_blank">{walletData.LedgerURL}</StyledAnchor></StyledWalletDiv>
                            </StyledContainer> : null}
                            </Col>
                        </Row>
                    </Space>
                </Radio.Group>
            </p>
        </Drawer>
    );
};

export default WalletDetailsPage;