/// <reference path="../Component.ts" />

namespace zen {

    export class MeshFilterComponent extends Component {
        
        public readonly type:ComponentType = ComponentType.MeshFilter;

        private _mesh:MeshAsset;

        public set mesh(mesh:MeshAsset) {
            this._mesh = mesh;
        }

        public get mesh():MeshAsset {
            return this._mesh;
        }

        public update(deltaTime:number) {

        }

    }

}