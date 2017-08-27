/// <reference path="../Component.ts" />

namespace zen {

    export class MeshRendererComponent extends Component {
        
        public readonly type:ComponentType = ComponentType.MeshRenderer;

        public castShadows:boolean = true;

        public receiveShadows:boolean = true;

        public materials:MaterialAsset[] = [];

        public useLightProbes:boolean = false;

        public render(app:Application, deltaTime:number) {
            let meshFilter:MeshFilterComponent = this.gameObject.getComponent<MeshFilterComponent>(ComponentType.MeshFilter);
            let mesh:MeshAsset = meshFilter.mesh;
        }

    }

}