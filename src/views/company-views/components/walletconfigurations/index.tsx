import { LeftCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Row, Space } from 'antd';
import { useState } from 'react';
import companyService from 'services/companyService';
import styled from "styled-components";

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
    font-size: 20px;
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

export const WalletConfigurationsPage = (props: { onClose: any; open: boolean; showWalletDetailsDrawer: any; }) => {

    const [invitationUrl, setInvitationUrl] = useState('');
    const [acceptInvitationStatus, setAcceptInvitationStatus] = useState<boolean>(false);
    const [acceptInvitationMessage, setAcceptInvitationMessage] = useState<string>('');
    const [loadStatus, setLoadStatus] = useState<boolean>(false);

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} disabled={loadStatus} onClick={props.onClose}>Cancel</Button>
                    </StyledActionButton>
                </Row>
                <Row>
                    <StyledActionButton>
                        <StyledButton loading={loadStatus} disabled={loadStatus} type="primary" block size={"middle"} onClick={async () => {
                            setAcceptInvitationMessage('');
                            setLoadStatus(true);
                            const response = await companyService.acceptInvitation(invitationUrl);
                            if (response) {
                                setAcceptInvitationMessage('Connection successful');
                                setAcceptInvitationStatus(true);
                            } else {
                                setAcceptInvitationMessage('Connection failed');
                                setAcceptInvitationStatus(false);
                            }
                            setLoadStatus(false);
                        }}
                        >CONNECT</StyledButton>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title="MY WALLET - CONFIGURE" placement="right" onClose={()=>{
            props.onClose();
            props.showWalletDetailsDrawer();
        }} open={props.open} footer={footerActionButtons()}  closable={true} closeIcon={<LeftCircleOutlined/>}  extra={
            <CloseCircleOutlined onClick={props.onClose}/>
         }>
            <p>
                <StyledTitle>Here, you can configure your wallet, save your credentials to your mobile wallet etc.</StyledTitle>
            </p>
            <p>
                <StyledSubTitle>Wallet Configurations</StyledSubTitle>
            </p>
            <p>
                <StyledDescription>Connection URL</StyledDescription>
            </p>
            <p>
                <TextArea rows={5} placeholder="Wallet Configurations" onChange={(e) => { setInvitationUrl(e.target.value) }} />
            </p>
            <p>
                <StyledMessage status={acceptInvitationStatus}>{acceptInvitationMessage}</StyledMessage>
            </p>
        </Drawer>
    );
};

export default WalletConfigurationsPage;