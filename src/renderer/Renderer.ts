namespace zen.renderer {

    export interface IRenderer {
        init(options:any):void;
        render(mesh:MeshAsset, material:MaterialAsset, info:MeshInfo):void;
    }

}