import { Alert, Button, Drawer, Radio, Row, Space, Input } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import styled from "styled-components";
import { CloseCircleOutlined } from "@ant-design/icons";
import companyService from "../../../../services/companyService";

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
    margin-left: 30px;
`;

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

export const WalletDetailsPage = (props: { onClose: any; open: boolean; showWalletConfigurationsDrawer: any; walletData: any; defaultWalletData: any; }) => {

    const { defaultWalletData } = props;
    const [selectedValue, setSelectedValue] = useState('a');
    const [connectionUrl, setConnectionUrl] = useState<any>('');
    const walletData:any = {};

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
                        }}>Cancel</Button>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title="MY WALLET - SETTINGS" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}
            closable={false} extra={
                <CloseCircleOutlined onClick={props.onClose} />
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
                        {Object.keys(defaultWalletData).length !== 0 && selectedValue === 'a' ?
                            <StyledContainer>
                                <p style={{ marginBottom: '0px' }}>
                                    <strong>Wallet Details</strong>
                                </p>
                                <StyledWalletDiv>
                                    <StyledAnchor>{defaultWalletData.AgentServiceEndpoint}</StyledAnchor>
                                </StyledWalletDiv>
                                <StyledWalletDiv>Ledger Name: {defaultWalletData.LedgerName}</StyledWalletDiv>
                                <StyledWalletDiv>Ledger URL: <StyledAnchor target={"_blank"} href={defaultWalletData.LedgerURL}>{defaultWalletData.LedgerURL}</StyledAnchor></StyledWalletDiv>
                                <StyledWalletDiv>Connection URL: <TextArea rows={4} bordered={true} style={{border: "0.5px solid black", fontSize: "12px"}} size={"large"} value={connectionUrl} /></StyledWalletDiv>
                            </StyledContainer> : null}
                        <div style={{ marginTop: '10px' }}>
                            <Radio value="b">{Object.keys(walletData).length !== 0 ? 'Own External Wallet' : 'Own External Wallet'}</Radio>
                        </div>
                        {Object.keys(walletData).length !== 0 && selectedValue === 'b' ?
                            <StyledContainer>
                                <p style={{ marginBottom: '0px' }}>
                                    <strong>Wallet Details</strong>
                                </p>
                                <StyledWalletDiv>
                                    <StyledAnchor>{walletData.AgentServiceEndpoint}</StyledAnchor>
                                </StyledWalletDiv>
                                <StyledWalletDiv>Ledger Name: {walletData.LedgerName}</StyledWalletDiv>
                                <StyledWalletDiv>Ledger URL: <StyledAnchor href={walletData.LedgerURL} target="_blank">{walletData.LedgerURL}</StyledAnchor></StyledWalletDiv>
                            </StyledContainer> : null}
                    </Space>
                </Radio.Group>
            </p>
        </Drawer>
    );
};

export default WalletDetailsPage;