import { Drawer, Alert, Row, Table, Col, Card, Button } from 'antd';
import { useEffect, useState } from 'react';
import companyService from 'services/companyService';
import styled from "styled-components";
import credentialLogo from '../../../../assets/img/icons/bolagsverket.png';
import { CloseCircleOutlined } from "@ant-design/icons";

const StyledSubheader = styled.div`
    font-size: 13px;
`;

const StyledCredentialCard = styled(Card)`
    border-radius: 1.25rem;
    height: 90px;
    border: 1px solid black;
    cursor: pointer;
    margin-bottom: 10px;
`;

const StyledCredentialCardTitle = styled.div`
    font-size: 12px;
    text-transform: uppercase;
`;

const StyledCredentialCardSubTitle = styled.div`
    font-weight: bold;
    font-size: 11px;
`;

const StyledCredentialCardDescription = styled.div`
    font-size: 11px;
`;

const StyledEmptyCredentialMessage = styled.div`
    font-size: 10px;
`;

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

export const ViewCredentialsPage = (props: { onClose: any; open: boolean; showViewSelectedCredentialDrawer: any; setSelectedViewCredentialAttributes: any; openViewSelectedCredentialsDrawer: boolean; setSelectedViewCredentialReferent: any; }) => {
    const [credentialList, setCredentialList] = useState<any[]>([]);

    useEffect(() => {
        if (props.open) getCertificatesAndUpdateList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.open]);

    useEffect(() => {
        if (!props.openViewSelectedCredentialsDrawer) getCertificatesAndUpdateList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.openViewSelectedCredentialsDrawer]);

    const getCertificatesAndUpdateList = async () => {
        const response = await companyService.getCertificates();
        console.log(response.results);
        const certificatesDataList = response.results.map((item: any, index: number) => { return { title: item.schema_id.split(':')[2], index, attributes: item.attrs, referent: item.referent } });
        updateCredentialsList(certificatesDataList);
    };

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={props.onClose}>Cancel</Button>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    const updateCredentialsList = (credentialSchemaList: any[]) => {
        const credentialCardArray = credentialSchemaList.map((item: any) => {
            return (
                <Row >
                    <Col span={24}>
                        <StyledCredentialCard bodyStyle={{padding: "17px"}} onClick={() => {
                            props.showViewSelectedCredentialDrawer();
                            props.setSelectedViewCredentialAttributes(item.attributes);
                            props.setSelectedViewCredentialReferent(item.referent);
                        }}>
                            <Row>
                                <Col span={20}>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <StyledCredentialCardTitle>{item.title}</StyledCredentialCardTitle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <StyledCredentialCardSubTitle>Bygg AB, Sweden</StyledCredentialCardSubTitle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <StyledCredentialCardDescription>Issued by: Bolagsverket, Sweden</StyledCredentialCardDescription>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={2} offset={2}>
                                    <img src={credentialLogo} style={{ width: "30px" }} alt="credential" />
                                </Col>
                            </Row>
                        </StyledCredentialCard>
                    </Col>
                </Row>);
        });
        setCredentialList(credentialCardArray);
    }

    return (
        <Drawer title="MY WALLET - VIEW CREDENTIALS" placement="right" onClose={props.onClose} open={props.open} footer={footerActionButtons()}
            closable={false} extra={
                <CloseCircleOutlined onClick={props.onClose} />
            }>
            <p>
                <StyledSubheader>Below is the list of available credentials in your wallet.</StyledSubheader>
            </p>
            {credentialList.length > 0 ? <p>
                {credentialList}
            </p> :
                <p>
                    <StyledEmptyCredentialMessage>Empty, no credentials existing</StyledEmptyCredentialMessage>
                </p>}
        </Drawer>
    );
};

export default ViewCredentialsPage;