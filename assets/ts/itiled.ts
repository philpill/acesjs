export interface ILayer {
    data: number[];
    height: number;
    name: string;
    opacity: number;
    type: string;
    visible: boolean;
    width: number;
    x: number;
    y: number;
}

interface IProperties {
    [key: string] : any
}

interface IPropertyTypes {
    [key: string]: string
}

interface ITileSet {
    columns: number;
    firstgid: number;
    image: string;
    imageheight: number;
    imagewidth: number;
    margin: number;
    name: string;
    spacing: number;
    tilecount: number;
    tileheight: number;
    tilewidth: number;
    transparentcolor: string
}

export interface ITiledLevel {

    entities: any[];

    height: number;
    layers: ILayer[];
    nextobjectid: number;
    orientation: string;
    properties: IProperties;
    propertytypes: IPropertyTypes;
    renderorder: string;
    tileheight: number;
    tilesets: ITileSet[];
    tilewidth: number;
    version: number;
    width: number

}