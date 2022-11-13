export interface ConnectionInvitation {
    connection_id?: string;
    invitation?: Invitation;
    invitation_url?: string;
}
export interface Invitation {
    "@type"?: string;
    "@id"?: string;
    label?: string;
    recipientKeys?: (string)[] | null;
    serviceEndpoint?: string;
    imageUrl?: string;
}
