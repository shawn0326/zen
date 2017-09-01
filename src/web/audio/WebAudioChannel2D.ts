namespace zen.web {

    export class WebAudioChannel2D implements sound.IAudioChannel2D {

        protected source:AudioBufferSourceNode;

        protected gain:GainNode;

        constructor(audio:WebAudio, asset:AudioAsset) {
            this._init(audio, asset);
        }

        protected _init(audio:WebAudio, asset:AudioAsset) {
            let context = audio.audioContext;

            this.source = context.createBufferSource();
            this.gain = context.createGain();

            this.source.buffer = audio.getAudioBuffer(asset);

            // Connect up the nodes
            this.source.connect(this.gain);
            this.gain.connect(context.destination);
        }

        public set volume(value:number) {
            value = Math.max(Math.min(value, 1), -0.999);
            this.gain.gain.value = value;
        }

        public get volume():number {
            return this.gain.gain.value;
        }

        public set loop(value:boolean) {
            this.source.loop = value;
        }

        public get loop():boolean {
            return this.source.loop;
        }

        public start(offset?:number) {
            this.source.start(undefined, offset || undefined);
        }

        public stop() {
            this.source.stop();
        }

        public dispose() {
            this.source.buffer = null;
        }      
    }
}