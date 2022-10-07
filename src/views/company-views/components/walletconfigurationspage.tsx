import { Button, Drawer, Input, Row } from 'antd';
import styled from "styled-components";

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

export const WalletConfigurationsPage = (props: { onClose: any; open: boolean; }) => {
    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={() => { }}>Cancel</Button>
                    </StyledActionButton>
                </Row>
                <Row>
                    <StyledActionButton>
                        <StyledButton type="primary" block size={"middle"} onClick={() => { }}>Submit</StyledButton>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title="CONFIGURE WALLET" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}>
            <p>
                Here, you can configure your wallet, save your credentials to your mobile wallet etc.
            </p>
            <p>
                <TextArea rows={20} placeholder="Wallet Configurations" />
            </p>
        </Drawer>
    );
};

export default WalletConfigurationsPage;