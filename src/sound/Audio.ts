namespace zen.sound {

    export interface IAudioChannel2D {
        volume:number;
        loop:boolean;
        start(offset?:number):void;
        stop():void;
        dispose():void;
    }

    export interface IAudioChannel3D extends IAudioChannel2D {
        setPosition(x:number, y:number, z:number):void;
    }

    export interface IAudioListener {
        setPosition(x:number, y:number, z:number):void;
    }

    export interface IAudio {
        init():void;
        active():void;
        decodeAudioData(audio:AudioAsset, sucCallback:() => void, errCallback:() => void):void;
        createAudioChannel2D(audio:AudioAsset):sound.IAudioChannel2D;
        createAudioChannel3D(audio:AudioAsset):sound.IAudioChannel3D;
        getAudioListener():sound.IAudioListener;
    }

}