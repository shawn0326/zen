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

        public set maxDistance(value:number) {
            this.panner.maxDistance = value;
        }

        public get maxDistance():number {
            return this.panner.maxDistance;
        }

        public set minDistance(value:number) {
            this.panner.refDistance = value;
        }

        public get minDistance():number {
            return this.panner.refDistance;
        }

        public set rollOffFactor(value:number) {
            this.panner.rolloffFactor = value;
        }

        public get rollOffFactor():number {
            return this.panner.rolloffFactor;
        }

        public set distanceModel(value:string) {
            if(value === "linear" || value === "inverse" || value === "exponential") {
                this.panner.distanceModel = value;
            } else {
                console.warn("distanceModel: " + value + " Is not a valid parameter");
            }
        }

        public get distanceModel():string {
            return this.panner.distanceModel;
        }

        private position:math.Vector3 = new math.Vector3();

        public setPosition(x:number, y:number, z:number) {
            this.position.set(x, y, z);
            this.panner.setPosition(x, y, z);
        }    

        public getPosition():math.Vector3 {
            return this.position;
        }      

        private velocity:math.Vector3 = new math.Vector3();

        public setVelocity(x:number, y:number, z:number) {
            this.velocity.set(x, y, z);
            this.panner.setVelocity(x, y, z);
        }    

        public getVelocity():math.Vector3 {
            return this.velocity;
        }
    }
}