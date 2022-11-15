export interface ListCertificatesResponse {
    results?: (ResultsEntity)[] | null;
}
export interface ResultsEntity {
    referent: string;
    attrs: any;
    schema_id: string;
    cred_def_id: string;
    rev_reg_id?: null;
    cred_rev_id?: null;
}