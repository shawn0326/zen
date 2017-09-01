namespace zen.web {

    export class WebAudio {

        public audioContext: AudioContext;

        public init() {
            let _win: any = window;
            let _AudioContext = _win["AudioContext"] || _win["webkitAudioContext"] || _win["mozAudioContext"] || _win["msAudioContext"];
            if (!!_AudioContext) {
                this.audioContext = new _AudioContext();
                console.log("AudioContext inited --> ");
                console.log(this.audioContext);
            } else {
                console.error("!Your browser does not support AudioContext");
            }
        }

        public active() {
            let buffer = this.audioContext.createBuffer(1, 1, 22050);
            let source = this.audioContext.createBufferSource();
            source.buffer = buffer;

            // connect to output (your speakers)
            source.connect(this.audioContext.destination);

            // play the file
            source.start();
        }

        private _audioBufferCache:{[key:string]:AudioBuffer} = {};

        public getAudioBuffer(audio:AudioAsset) {
            return this._audioBufferCache[audio.guid];
        }

        public decodeAudioData(audio:AudioAsset, sucCallback:() => void, errCallback:() => void) {
            this.audioContext.decodeAudioData(audio.buffer, (audioBuffer) => {
                this._audioBufferCache[audio.guid] = audioBuffer;
                sucCallback();
            }, () => {
                errCallback();
            });
        }

        public createAudioChannel2D(audio:AudioAsset):sound.IAudioChannel2D {
            return new WebAudioChannel2D(this, audio);
        }

        public createAudioChannel3D(audio:AudioAsset):sound.IAudioChannel3D {
            return new WebAudioChannel3D(this, audio);
        }

        private listener:sound.IAudioListener;

        public getAudioListener():sound.IAudioListener {
            if(!this.listener) {
                this.listener = new WebAudioListener(this.audioContext);
            }
            return  this.listener;
        }
    }

}