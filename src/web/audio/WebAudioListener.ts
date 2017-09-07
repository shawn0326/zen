namespace zen.web {

    export class WebAudioListener implements sound.IAudioListener {

        private readonly listener:AudioListener;

        private position:math.Vector3 = new math.Vector3();

        private velocity:math.Vector3 = new math.Vector3();

        private orientation:math.Matrix4 = new math.Matrix4();

        constructor(context:AudioContext) {
            this.listener = context.listener;
        }

        public setPosition(x:number, y:number, z:number) {
            this.position.set(x, y, z);
            this.listener.setPosition(x, y, z);
        }    

        public getPosition():math.Vector3 {
            return this.position;
        }

        public setVelocity(x:number, y:number, z:number) {
            this.velocity.set(x, y, z);
            this.listener.setVelocity(x, y, z);
        }    

        public getVelocity():math.Vector3 {
            return this.velocity;
        }

        public setOrientation(orientation:math.Matrix4) {
            this.orientation.copy(orientation);
            this.listener.setOrientation(
                -orientation.data[8], -orientation.data[9], -orientation.data[10],
                orientation.data[4], orientation.data[5], orientation.data[6]
            );
        }   

        public getOrientation():math.Matrix4 {
            return this.orientation;
        }
    }
}