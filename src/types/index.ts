export type School = {
    id: number;
    udiseschcode: string;
    universityname: string | null;
    universityid: string | null;
    universitytype: string | null;
    collegename: string | null;
    collegeid: string | null;
    collegetype: string | null;
    institutionname: string | null;
    institutionid: string | null;
    institutiontype: string | null;
    address: string | null;
    website: string | null;
    specialisedin: string | null;
    schoolname: string | null;
    schooltype: string | null;
    pincode: number;
    locality: string;
    category: number;
    type: number;
    classfrom: number;
    classto: number;
    status: string | null;
    state: string;
    district: string;
    block: string;
    cluster: string;
    village: string;
    management: string;
    yearofestablishment: string | null;
    yearwhendecalreduniversity: string | null;
    uploadyear: string | null;
    instituteaddedinsurveyyear: string | null;
};

export type SchoolData = {
    totalItems: number;
    totalPages?: number;
    page: number;
    search: string;
    next?: string;
    results: School[];
};

export type State = {
    id: number
    statename: string
}

export type District = {
    id: number
    stateid: number
    districtname: string
}
