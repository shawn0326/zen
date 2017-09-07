namespace zen.sound {

    export interface IAudioChannel2D {
        volume:number;
        loop:boolean;
        start(offset?:number):void;
        stop():void;
        dispose():void;
    }

    export interface IAudioChannel3D extends IAudioChannel2D {
        maxDistance:number;
        minDistance:number;
        rollOffFactor:number;
        distanceModel:string;
        setPosition(x:number, y:number, z:number):void;
        getPosition():math.Vector3;
        setVelocity(x:number, y:number, z:number):void;
        getVelocity():math.Vector3;
    }

    export interface IAudioListener {
        setPosition(x:number, y:number, z:number):void;
        getPosition():math.Vector3;
        setVelocity(x:number, y:number, z:number):void;
        getVelocity():math.Vector3;
        setOrientation(orientation:math.Matrix4):void;
        getOrientation():math.Matrix4;
    }

    export interface IAudio {
        init():void;
        active():void;
        createAudioChannel2D(audio:AudioAsset):sound.IAudioChannel2D;
        createAudioChannel3D(audio:AudioAsset):sound.IAudioChannel3D;
        getAudioListener():sound.IAudioListener;
    }

}