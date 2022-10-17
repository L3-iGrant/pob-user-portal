import styled from "styled-components";
import { Drawer, Alert, Row, Table, Col, Card, Button, Space } from 'antd';
import { LeftCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

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

const StyledTable = styled(Table)`
    border: 1px solid #ddd;
    border-radius: 5px;
`

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledLeftCircleOutlined = styled(LeftCircleOutlined)`
    font-size: 25px;
    cursor: pointer;
`;


export const ViewSelectedCredentialPage = (props: { onClose: any; open: boolean; selectedViewCredentialAttributes: any; onViewCredentialsDrawerClose: any; }) => {

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={() => {
                            props.onClose();
                            props.onViewCredentialsDrawerClose();
                        }}>Cancel</Button>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    const camelToTitle = (camelCase: string) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

    const updateAttributesTable = (credentialsAttributeList: any[]) => {
        let index = 1;
        let tempData = [];
        for (let item in credentialsAttributeList) {
            tempData.push({ 
                key: `${index}`, 
                attribute: camelToTitle(item.split('.').at(-1) || ''), 
                value: credentialsAttributeList[item] 
            });
            index = index + 1;
        }
        return tempData;
    };
    return (
        <Drawer title="VIEW CREDENTIALS" placement="right" onClose={() => {
            props.onClose();
            props.onViewCredentialsDrawerClose();
        }} open={props.open} extra={
            <Space>
                <StyledLeftCircleOutlined onClick={props.onClose} />
            </Space>
        } footer={footerActionButtons()}>
            <p>
                <StyledTable columns={columns} dataSource={updateAttributesTable(props.selectedViewCredentialAttributes)} bordered pagination={false} />
            </p>
        </Drawer>
    );
}

export default ViewSelectedCredentialPage;