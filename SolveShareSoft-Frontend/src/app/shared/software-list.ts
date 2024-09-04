import { Category } from "./category";
import { Software } from "./software";
import { User } from "./user";

export interface SoftwareList {
    softwareListId: number;
    title: string;
    description: string;
    created: Date;
    lastUpdate: Date;
    isPublic: boolean;
    nbrViews: number;
    category: Category;
    owner?: User;
    softwares : Software[];
}
