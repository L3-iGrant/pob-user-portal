import { Button, Drawer, Input, Row } from 'antd';
import styled from "styled-components";
import React, { useState } from 'react';
import companyService from 'services/companyService';

const { TextArea } = Input;

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledButton = styled(Button)`
    border-color: #1890ff;
    background: #1890ff;
    background-color: #505050;
    border-color: #505050;
`;

const StyledTextP1 = styled.p`
    font-size: 18px;
`;

const StyledTextP2 = styled.p`
    font-size: 13px;
`;

const StyledTextP3 = styled.p<{ status: boolean }>`
    font-size: 16px;
    color: green;
    color: ${p => (p.status ? 'green' : 'red')};
`;

export const WalletConfigurationsPage = (props: { onClose: any; open: boolean; }) => {
    const [invitationUrl, setInvitationUrl] = useState('');
    const [acceptInvitationStatus, setAcceptInvitationStatus] = useState<boolean>(false);
    const [acceptInvitationMessage, setAcceptInvitationMessage] = useState<string>('');
    const [loadStatus, setLoadStatus] = useState<boolean>(false);

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={props.onClose}>Cancel</Button>
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
                        }}>CONNECT</StyledButton>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title="CONFIGURE WALLET" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}>
            <p>
                Here, you can configure your own external wallet where you can save your credentials etc.
            </p>
            <StyledTextP1>Wallet Configurations</StyledTextP1>
            <StyledTextP2>Connection invitation</StyledTextP2>
            <p>
                <TextArea rows={12} onChange={(e) => { console.log(e.target.value); setInvitationUrl(e.target.value); }} />
            </p>
            <StyledTextP3 status={acceptInvitationStatus}>{acceptInvitationMessage}</StyledTextP3>
        </Drawer>
    );
};

export default WalletConfigurationsPage;