import { Drawer, Alert, Row, Table } from 'antd';
import styled from "styled-components";
import ReactJson from 'react-json-view';

const StyledInfoSections = styled.div`
    margin-bottom: 10px;
`;

const StyledAlert = styled(Alert)`
    background-color: #ddd;
    border-color: #505050;
`;

const StyledTable = styled(Table)`
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const columns: any[] = [
    {
        title: <h3>{'Attribute'}</h3>,
        dataIndex: 'attribute',
        key: 'attribute',
    },
    {
        title: <h3>{'Value'}</h3>,
        dataIndex: 'value',
        key: 'value',
    }
];

const dummyJsonData = {
    "isbn": "123-456-222",
    "author":
    {
        "lastname": "Doe",
        "firstname": "Jane"
    },
    "editor":
    {
        "lastname": "Smith",
        "firstname": "Jane"
    },
    "title": "The Ultimate Database Study Guide",
    "category": ["Non-Fiction", "Technology"]
};

export const ViewCredentialsPage = (props: { onClose: any; open: boolean; }) => {

    const data: any[] = [
        {
            key: '1',
            attribute: 'Entity name effective',
            value: 'December 10, 1994',
        },
        {
            key: '2',
            attribute: 'Registration date',
            value: '1999',
        },
        {
            key: '3',
            attribute: 'Entity status effective',
            value: 'August 12, 2022',
        },
        {
            key: '4',
            attribute: 'Expiry date',
            value: 'August 11, 2023',
        }
    ];

    return (
        <Drawer title="VIEW CREDENTIALS" placement="right" onClose={props.onClose} open={props.open}>
            <p>
                <StyledAlert
                    message={
                        <div>
                            <StyledInfoSections>
                                <h3>Registration credential verified</h3>
                                <div>Cryptographically verified Sep, 01 2022 at 11:09 am Credential Issued: Nov 11, 2021</div>
                            </StyledInfoSections>
                            <StyledInfoSections>
                                <h3>The following verifications were successfully completed:</h3>
                                <ul>
                                    <li>Credential issuer is Bolagsverket, Sverige</li>
                                    <li>Credential is held by Bygg AB</li>
                                    <li>Credential is valid</li>
                                    <li>Credential is tamper-free</li>
                                </ul>
                            </StyledInfoSections>
                        </div>}
                    type="info"
                />
            </p>
            <p>
                <Row>
                    <h3>CREDENTIALS</h3>
                </Row>
                <Row>
                    <StyledTable columns={columns} dataSource={data} bordered pagination={false} />
                </Row>
            </p>
            <p>
                <Row>
                    <h3>PROOF DETAILS</h3>
                </Row>
                <Row>
                    <StyledAlert
                        message={<ReactJson src={dummyJsonData} enableClipboard={false} />}
                        type="info"
                    />
                </Row>
            </p>
        </Drawer>
    );
};

export default ViewCredentialsPage;