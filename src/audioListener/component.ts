/// <reference path="../Component.ts" />

namespace zen {

    export class AudioListenerComponent extends Component {
        
        public readonly type:ComponentType = ComponentType.AudioListener;

        public update(deltaTime:number) {
            if(this.gameObject) {
                let position = this.gameObject.getPosition();
                Audio.getAudioListener().setPosition(position.x, position.y, position.z);

                let wtm = this.gameObject.getWorldMatrix();
                Audio.getAudioListener().setOrientation(wtm);
            }
        }

    }

}