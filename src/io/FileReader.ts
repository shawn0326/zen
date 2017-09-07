namespace zen.io {

    export interface IFileReader {
        init(): void;
        loadSound(name:string, url:string, callback:(asset:AudioAsset) => void): void;
    }

}