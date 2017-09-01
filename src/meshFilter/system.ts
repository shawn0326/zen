/// <reference path="../System.ts" />

namespace zen {

    export class MeshFilterComponentSystem extends System {

        update(deltaTime:number) {
            for(let key in this._components) {
                let meshFilter = this._components[key] as MeshFilterComponent;
                meshFilter.enabled && meshFilter.update(deltaTime);
            }
        }

    }

}