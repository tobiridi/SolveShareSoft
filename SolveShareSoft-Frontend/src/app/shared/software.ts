import { SoftwareList } from "./software-list";

export interface Software {
    softwareId: number;
    name: string;
    description: string;
    version: string;
    size: number;
    sizeUnit: string;
    lastUpdate: Date;
    lang: string;
    nbrDownloads: number;
    link: string;
    softwareList: SoftwareList;
}
