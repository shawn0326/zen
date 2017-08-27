/// <reference path="../System.ts" />

namespace zen {

    export class MeshRendererComponentSystem extends System {

        update(deltaTime:number) {
            for(let key in this._components) {
                let renderer = this._components[key] as MeshRendererComponent;
                renderer.render(this._app, deltaTime);
            }
        }

    }

}