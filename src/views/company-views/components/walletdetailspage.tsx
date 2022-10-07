import { Alert, Button, Drawer } from 'antd';
import styled from "styled-components";

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledAlert = styled(Alert)`
    background-color: #ddd;
    border-color: #505050;
`;

export const WalletDetailsPage = (props: { onClose: any; open: boolean; }) => {
    const footerActionButtons = () => {
        return (
            <div>
                <StyledActionButton>
                    <Button block size={"middle"} onClick={() => { }}>Cancel</Button>
                </StyledActionButton>
            </div>
        );
    }

    return (
        <Drawer title="YOUR WALLET" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}>
            <p>
                This provides information on your wallet connected to Bolagsverket, Sweden.
            </p>
            <p>
                <StyledAlert
                    message={'Wallet Details'}
                    type="info"
                />
            </p>
        </Drawer>
    );
};

export default WalletDetailsPage;