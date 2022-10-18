import { Alert, Button, Drawer, Radio, Row, Space } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import {CloseCircleOutlined} from "@ant-design/icons";

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
    margin-left: 30px;
`;

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

export const WalletDetailsPage = (props: { onClose: any; open: boolean; showWalletConfigurationsDrawer: any; walletData: any }) => {

    const { walletData } = props;
    const [selectedValue, setSelectedValue] = useState('a');

    useEffect(() => {
        setSelectedValue('a');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    const handleChange = (event: RadioChangeEvent) => {
        setSelectedValue(event.target.value);
        if (event.target.value === 'b') {
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
                        }}>Cancel</Button>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title="MY WALLET - SETTINGS" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}
            closable={false}  extra={
            <CloseCircleOutlined onClick={props.onClose}/>
         }>
            <p>
                This is the details of your company wallet which you can use to share your credentials with any third-party.
            </p>
            <p>
                <Radio.Group onChange={handleChange} value={selectedValue}>
                    <Space direction="vertical">
                        <div>
                            <Radio value="a">Default Wallet (Provided by Bolagsverket)</Radio>
                        </div>
                        <StyledContainer>
                            <p style={{marginBottom: '0px'}}>
                                <strong>Wallet Details</strong>
                            </p>
                            <StyledWalletDiv>
                                <StyledAnchor>{walletData.AgentServiceEndpoint}</StyledAnchor>
                            </StyledWalletDiv>
                            <StyledWalletDiv>Ledger Name: {walletData.LedgerName}</StyledWalletDiv>
                            <StyledWalletDiv>Ledger URL: <StyledAnchor href={walletData.LedgerURL}>{walletData.LedgerURL}</StyledAnchor></StyledWalletDiv>
                        </StyledContainer>
                        <div style={{marginTop: '10px'}}>
                            <Radio value="b">Own Wallet (Configure)</Radio>
                        </div>
                        {/* {selectedValue === 'b' ?
                            <StyledContainer>
                                <p>
                                    <strong>Wallet Details</strong>
                                </p>
                                <StyledWalletDiv>
                                    Agent service endpoint
                                </StyledWalletDiv>
                                <StyledWalletDiv>
                                    <StyledAnchor>{walletData.serviceEndpoint}</StyledAnchor>
                                </StyledWalletDiv>
                                <StyledWalletDiv>Agent label: {walletData.label}</StyledWalletDiv>
                                <StyledWalletDiv>DID: {(walletData['@type'] || '').split(';')[0]}</StyledWalletDiv>
                            </StyledContainer> : null} */}
                    </Space>
                </Radio.Group>
            </p>
        </Drawer>
    );
};

export default WalletDetailsPage;