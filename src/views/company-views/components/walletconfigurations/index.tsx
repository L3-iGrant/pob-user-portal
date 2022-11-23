import { LeftCircleOutlined, LeftOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, message, Row, Space } from 'antd';
import { useState } from 'react';
import companyService from 'services/companyService';
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledButton = styled(Button)`

`;

const StyledTitle = styled.div`
    font-size: 15px;
`;

const StyledSubTitle = styled.div`
    font-size: 18px;
`;

const StyledDescription = styled.div`
    font-size: 12px;
`;

const StyledMessage = styled.div<{ status: boolean }>`
    font-size: 12px;
    color: ${p => (p.status ? 'green' : 'red')};
`;

const StyledLeftCircleOutlined = styled(LeftCircleOutlined)`
    font-size: 25px;
    cursor: pointer;
`;

export const WalletConfigurationsPage = (props: { onClose: any; open: boolean; showWalletDetailsDrawer: any;}) => {

    const [invitationUrl, setInvitationUrl] = useState('');
    const [acceptInvitationStatus, setAcceptInvitationStatus] = useState<boolean>(false);
    const [acceptInvitationMessage, setAcceptInvitationMessage] = useState<any>('');
    const [loadStatus, setLoadStatus] = useState<boolean>(false);
    const { t, i18n } = useTranslation();
    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} disabled={loadStatus} onClick={props.onClose}>{t("Cancel")}</Button>
                    </StyledActionButton>
                </Row>
                <Row>
                    <StyledActionButton>
                        <StyledButton loading={loadStatus} disabled={loadStatus} type="primary" block size={"middle"} onClick={async () => {
                            setAcceptInvitationMessage('');
                            setLoadStatus(true);
                            const response = await companyService.acceptInvitation(invitationUrl);
                            if (response) {
                                setAcceptInvitationMessage(t('Connection successful'));
                                setAcceptInvitationStatus(true);
                            } else {
                                setAcceptInvitationMessage(t('Connection failed'));
                                setAcceptInvitationStatus(false);
                            }
                            setLoadStatus(false);
                        }}
                        >{t('CONNECT')}</StyledButton>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title={t("MY WALLET - CONFIGURE")} placement="right" onClose={()=>{
            props.onClose();
            props.showWalletDetailsDrawer();
        }} open={props.open} footer={footerActionButtons()}  closable={true} closeIcon={<LeftOutlined/>}  extra={
            <CloseCircleOutlined onClick={props.onClose}/>
         }>
            <p>
                <StyledTitle>{t('Here, you can configure your wallet, save your credentials to your mobile wallet etc')}</StyledTitle>
            </p>
            <p>
                <StyledSubTitle>{t('Wallet Configurations')}</StyledSubTitle>
            </p>
            <p>
                <StyledDescription>{t('Connection URL')}</StyledDescription>
            </p>
            <p>
                <TextArea rows={5} placeholder={t("Connection Invitation URL") || ''} onChange={(e) => { setInvitationUrl(e.target.value) }} />
            </p>
            <p>
                <StyledMessage status={acceptInvitationStatus}>{acceptInvitationMessage}</StyledMessage>
            </p>
        </Drawer>
    );
};

export default WalletConfigurationsPage;