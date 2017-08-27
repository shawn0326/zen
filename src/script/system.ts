/// <reference path="../System.ts" />

namespace zen {

    export class ScriptComponentSystem extends System {

        update(deltaTime:number) {
            for(let key in this._components) {
                let script = this._components[key] as ScriptComponent;
                script.update(this._app, deltaTime);
            }
        }
        
    }

}