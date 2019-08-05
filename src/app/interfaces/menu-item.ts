export interface MenuList {
    name: string;
    icon: string;
    expand: boolean;
    parent?:string;
    children?: MenuList[];
}