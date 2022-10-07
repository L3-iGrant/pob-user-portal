import { Drawer, Button, Row } from 'antd';
import styled from "styled-components";

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

const StyledLink = styled.a`
    color: #40a9ff;
    font-weght: bold;
`;

export const RequestCredentialsPage = (props: { onClose: any; open: boolean; }) => {
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
        <Drawer title="REQUEST CREDENTIALS" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}>
            <p>
                You are about to request credentials from Bolagsverket, Sweden. Confirm the details below and click submit the request to issue credentials.
            </p>
            <p>Once submitted, the requested credentials will be issued to the <StyledLink href="/company/">configured wallet</StyledLink>.</p>
        </Drawer>
    );
};

export default RequestCredentialsPage;