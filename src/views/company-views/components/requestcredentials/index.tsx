import { Drawer, Button, Row, Table, Checkbox } from 'antd';
import { REQUEST_CREDENTIAL_SUBMIT_ENABLED } from 'configs/AppConfig';
import { useEffect, useState } from 'react';
import companyService from 'services/companyService';
import styled from "styled-components";
import {CloseCircleOutlined} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { updateIsLoadingForFetchStoredCertificates } from 'views/company-views/companySlice';
import { useTranslation } from 'react-i18next';

const StyledActionButton = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;

const StyledButton = styled(Button)`
   
`;

const StyledLink = styled.a`
    color: #40a9ff;
    font-weght: bold;
`;

const StyledTable = styled(Table)`
    border: 1px solid #ddd;
    border-radius: 5px;

    tr > th, tr > td {
        padding: 10px 10px;
    }
`;

const camelToTitle = (camelCase: string) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();

export const RequestCredentialsPage = (props: { onClose: any; open: boolean; organisationId: string; schemaId: string; schemaTitle: string; onRequestCredentialSubmit: any; showWalletDetailsDrawer: any; issuer: any;}) => {
    const [dataAttributes, setDataAttributes] = useState<any[]>([]);
    const [submitLoader, setSubmitLoader] = useState<boolean>(false);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const columns: any[] = [
        {
            title: t('Select'),
            dataIndex: 'select',
            key: 'select',
            render: (keyVal: string) => <Checkbox key={keyVal} checked={true} disabled={true} />
        },
        {
            title: t('Data Attributes'),
            dataIndex: 'dataattributes',
            key: 'dataattributes',
        }
    ];

    useEffect(() => {
        setDataAttributes([]);
        if (props.organisationId !== '' && props.schemaId !== '') {
            fetchSchemaAttribute();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.organisationId, props.schemaId]);

    const fetchSchemaAttribute = async () => {
        const response = await companyService.getCertificateSchemaAttributeBySchemaIdAndOrganisationId(props.organisationId, props.schemaId);
        setDataAttributes(response.attrNames.map(
            (item: string, index: number) => { 
                return { select: `${index}`, dataattributes: camelToTitle(item.split('.').at(-1) || '') 
            } 
        }));
    };

    const footerActionButtons = () => {
        return (
            <div>
                <Row>
                    <StyledActionButton>
                        <Button block size={"middle"} onClick={props.onClose}>{t("Cancel")}</Button>
                    </StyledActionButton>
                </Row>
                <Row>
                    <StyledActionButton>
                        <StyledButton disabled={!REQUEST_CREDENTIAL_SUBMIT_ENABLED.includes(props.schemaId.split(":")[2])} loading={submitLoader} type="primary" block size={"middle"} onClick={async () => {
                            setSubmitLoader(true);

                            let certificateName = '';
                            switch(props.schemaId.split(":")[2]) {
                                case 'Certificate Of Registration':
                                    certificateName = 'certificate_of_registration';
                                    break;
                                case 'Ecolabel':
                                    certificateName = 'ecolabel';
                                    break;
                                case 'Real estate insurance':
                                    certificateName = 'real_estate_insurance';
                                    break;
                            }

                            const response = await companyService.submitCredentialRequest(certificateName);
                            setSubmitLoader(false);
                            if (response) {
                                dispatch(updateIsLoadingForFetchStoredCertificates(true))
                                props.onClose();
                                props.onRequestCredentialSubmit(props.organisationId, props.schemaId);
                            }
                        }}>{t("Submit")}</StyledButton>
                    </StyledActionButton>
                </Row>
            </div>
        );
    }

    return (
        <Drawer title={t("REQUEST CREDENTIALS")} placement="right" closable={false} onClose={props.onClose} open={props.open} footer={footerActionButtons()}
         extra={
            <CloseCircleOutlined onClick={props.onClose}/>
         }>
            <p>
            {`${t('You are about to request credentials from')} ${props.issuer}. ${t('Confirm the details below and click submit the request to issue credentials.')}`}
            </p>
            <p>{t("Requested credential")}: <span style={{textTransform: "uppercase"}}>{props.schemaTitle}</span></p>
            <p>{t("Once submitted, the requested credentials will be issued to the")} <StyledLink onClick={()=>{
                props.showWalletDetailsDrawer();
                props.onClose();
            }}>{t("configured wallet")}</StyledLink>.</p>
            <p>
                <StyledTable columns={columns} dataSource={dataAttributes} bordered pagination={false} />
            </p>
        </Drawer>
    );
};

export default RequestCredentialsPage;