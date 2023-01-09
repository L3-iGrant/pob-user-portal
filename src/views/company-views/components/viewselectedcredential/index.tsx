import styled from "styled-components";
import { Drawer, Alert, Row, Table, Col, Popconfirm, Button, Space, notification } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { CloseCircleOutlined } from "@ant-design/icons";
import companyService from "services/companyService";
import { useListStoredCertificatesQuery } from "services/company.rtk";
import { useTranslation } from 'react-i18next';

const StyledTable = styled(Table)`
    border: 1px solid #ddd;
    border-radius: 5px;
    
    tr > th, tr > td {
        padding: 10px 10px;
    }
    && tbody > tr:hover > td {
        background:#F3FAFD;
    }
`

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledDeleteOutlined = styled(DeleteOutlined)`
    font-size: 20px;
    cursor: pointer;
`;


export const ViewSelectedCredentialPage = (props: { onClose: any; open: boolean; selectedViewCredentialAttributes: any; onViewCredentialsDrawerClose: any; selectedViewCredentialReferent: string; }) => {
    const { data, error, isLoading, refetch } = useListStoredCertificatesQuery(undefined)
    const { t , i18n } = useTranslation();

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={() => {
                            props.onClose();
                        }}>{t("Cancel")}</Button>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    const columns: any[] = [
        {
            title: t('Attribute'),
            dataIndex: 'attribute',
            key: 'attribute',
        },
        {
            title: t('Value'),
            dataIndex: 'value',
            key: 'value',
        }
    ];
    
    const [open, setOpen] = useState(false);

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

    const openSuccessNotification = (message: string, description: string) => {
        notification.success({ message, description, duration: 5 });
    };

    const openErrorNotification = (message: string, description: string) => {
        notification.error({ message, description, duration: 5 });
    };

    return (
        <Drawer title={t("VIEW CREDENTIALS")} placement="right" onClose={() => { props.onClose(); }}
            open={props.open}
            extra={
                <Space>
                    <Popconfirm
                        title={t('Are you sure you want to delete this credential?')}
                        open={open}
                        onOpenChange={(newOpen: boolean) => { setOpen(newOpen); }}
                        onConfirm={async () => {
                            const response = await companyService.deleteCertificate('6343ecbb6de5d70001ac038e', props.selectedViewCredentialReferent);
                            if (response) {
                                refetch()
                                openSuccessNotification(t('Delete successful'), t(`Successfully deleted certificate`));
                                props.onClose();
                            } else {
                                openErrorNotification(t('Delete failed'), t(`Failed to delete certificate`));
                            }
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                        okText={t('Yes')}
                        cancelText={t('No')}
                        placement="bottomRight"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                    <CloseCircleOutlined onClick={props.onClose} />
                </Space>
            }
            footer={footerActionButtons()}
            closeIcon={<LeftOutlined />}
        >
            <p>
                <StyledTable columns={columns} dataSource={updateAttributesTable(props.selectedViewCredentialAttributes)} bordered pagination={false} />
            </p>
        </Drawer>
    );
}

export default ViewSelectedCredentialPage;