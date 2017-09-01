namespace zen.web {

    export class WebAudioListener {

        private readonly listener:AudioListener;

        constructor(context:AudioContext) {
            this.listener = context.listener;
        }

        public setPosition(x:number, y:number, z:number) {
            this.listener.setPosition(x, y, z);
        }       
    }
}