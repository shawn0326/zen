/// <reference path="../System.ts" />

namespace zen {

    export class AudioListenerSystem extends System {

        update(deltaTime:number) {
            for(let key in this._components) {
                let audioListener = this._components[key] as AudioListenerComponent;
                audioListener.enabled && audioListener.update(deltaTime);
            }
        }

    }

}