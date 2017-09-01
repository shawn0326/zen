/// <reference path="../System.ts" />

namespace zen {

    export class AudioSourceSystem extends System {

        update(deltaTime:number) {
            for(let key in this._components) {
                let audioSource = this._components[key] as AudioSourceComponent;
                audioSource.enabled && audioSource.update(deltaTime);
            }
        }

    }

}