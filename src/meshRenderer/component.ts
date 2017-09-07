/// <reference path="../Component.ts" />

namespace zen {

    export class MeshRendererComponent extends Component {
        
        public readonly type:ComponentType = ComponentType.MeshRenderer;

        public castShadows:boolean = true;

        public receiveShadows:boolean = true;

        public materials:MaterialAsset[] = [];

        public useLightProbes:boolean = false;

        public render(app:Application, deltaTime:number) {
            if(!this.gameObject) {
                return;
            }
            
            let meshFilter:MeshFilterComponent = this.gameObject.getComponent<MeshFilterComponent>(ComponentType.MeshFilter);
            let mesh:MeshAsset = meshFilter.mesh;

            let subMeshes:MeshInfo[] = mesh.getSubMeshes();
            for(let i = 0, l = subMeshes.length; i < l; i++) {
                let info = subMeshes[i];
                let matId = info.materialId;
                let material = this.materials[matId];
                Renderer.render(mesh, material, info);
            }
        }

    }

}