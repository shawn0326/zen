/// <reference path="WebAudioChannel2D.ts" />

namespace zen.web {

    export class WebAudioChannel3D extends WebAudioChannel2D implements sound.IAudioChannel3D {

        private panner:PannerNode;

        protected _init(audio:WebAudio, asset:AudioAsset) {
            let context = audio.audioContext;

            this.source = context.createBufferSource();
            this.panner = context.createPanner();
            this.gain = context.createGain();

            this.source.buffer = audio.getAudioBuffer(asset);

            // Connect up the nodes
            this.source.connect(this.panner);
            this.panner.connect(this.gain);
            this.gain.connect(context.destination);
        }

        public setPosition(x:number, y:number, z:number) {
            this.panner.setPosition(x, y, z);
        }        
    }
}