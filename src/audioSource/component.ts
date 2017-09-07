/// <reference path="../Component.ts" />

namespace zen {

    export class AudioSourceComponent extends Component {
        
        public readonly type:ComponentType = ComponentType.AudioSource;

        public update(deltaTime:number) {
            if(this._use3D && this._channel && this._playing && this.gameObject) {
                let position = this.gameObject.getPosition();
                (<sound.IAudioChannel3D>this._channel).setPosition(position.x, position.y, position.z);
            }
        }

        private _audio:AudioAsset | null;

        public set audio(value:AudioAsset | null) {
            if(this._audio != value) {
                this._audio = value;
                this._audio && this._createChannel(this._audio);
            }  
        }

        public get audio():AudioAsset | null {
            return this._audio;
        }

        private _createChannel(audio:AudioAsset) {
            if(this._playing && this._channel) {
                this._channel.stop();
                this._channel.dispose();
            }

            if(this.use3D) {
                this._channel = Audio.createAudioChannel3D(audio);
            } else {
                this._channel = Audio.createAudioChannel2D(audio);
            }
            this._channel.volume = this._volume;
            this._channel.loop = this._loop;

            if(this._playing) {
                this._channel.start();
            }
        }

        private _volume:number = 1;

        public set volume(value:number) {
            if(this._channel) {
                this._channel.volume = value;
                this._volume = value;
            }
        }

        public get volume():number {
            return this._volume;
        }

        private _loop:boolean = false;

        public set loop(value:boolean) {
            if(this._channel) {
                this._channel.loop = value;
                this._loop = value;
            }
        }

        public get loop():boolean {
            return this._loop;
        }

        private _channel:sound.IAudioChannel2D | sound.IAudioChannel3D | null;

        private _playing:boolean = false;

        public play(offset?:number) {
            if(this._channel && this.enabled) {
                this._channel.start(offset);
                this._playing = true;
            }
        }

        public stop() {
            if(this._channel) {
                this._channel.stop();
                this._playing = false;
            }
        }

        private _use3D:boolean = false;

        public set use3D(value:boolean) {
            if(this._use3D != value) {
                this._use3D = value;
                this._audio && this._createChannel(this._audio);
            }     
        }

        public get use3D():boolean {
            return this._use3D;
        }

        public get maxDistance():number {
            if(this._channel && this.use3D) {
                return (<sound.IAudioChannel3D>this._channel).maxDistance;
            }
            return 0;
        }

        public set maxDistance(value:number) {
            if(this._channel && this.use3D) {
                (<sound.IAudioChannel3D>this._channel).maxDistance = value;
            }
        }

        public get minDistance():number {
            if(this._channel && this.use3D) {
                return (<sound.IAudioChannel3D>this._channel).minDistance;
            }
            return 0;
        }

        public set minDistance(value:number) {
            if(this._channel && this.use3D) {
                (<sound.IAudioChannel3D>this._channel).minDistance = value;
            }
        }

        public get rollOffFactor():number {
            if(this._channel && this.use3D) {
                return (<sound.IAudioChannel3D>this._channel).rollOffFactor;
            }
            return 0;
        }

        public set rollOffFactor(value:number) {
            if(this._channel && this.use3D) {
                (<sound.IAudioChannel3D>this._channel).rollOffFactor = value;
            }
        }

        public get distanceModel():string {
            if(this._channel && this.use3D) {
                return (<sound.IAudioChannel3D>this._channel).distanceModel;
            }
            return "";
        }

        public set distanceModel(value:string) {
            if(this._channel && this.use3D) {
                (<sound.IAudioChannel3D>this._channel).distanceModel = value;
            }
        }

        public getVelocity():math.Vector3 {
            if(this._channel && this.use3D) {
                return (<sound.IAudioChannel3D>this._channel).getVelocity();
            }
            return new math.Vector3();
        }

        public setVelocity(x:number, y:number, z:number) {
            if(this._channel && this.use3D) {
                (<sound.IAudioChannel3D>this._channel).setVelocity(x, y, z);
            }
        }

    }

}