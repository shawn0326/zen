namespace zen.web {

    export class Http implements io.IFileReader {

        private static loadArrayBuffer(url:string, sucCallback:(bin: ArrayBuffer) => void, errCallback:() => void): void {
            let req = new XMLHttpRequest();
            req.open("GET", url);
            req.responseType = "arraybuffer";
            req.onreadystatechange = () => {
                if (req.readyState == 4) {
                    if (req.status == 404) {
                        errCallback();
                    } else {
                        sucCallback(req.response);
                    }   
                }
            };
            req.onerror = (e:ErrorEvent) => {
                errCallback();
            };
            req.send();
        }

        public init() {

        }

        public loadSound(name:string, url:string, callback:(asset:AudioAsset) => void) {
            let asset = new AudioAsset(name);

            Http.loadArrayBuffer(url, (buffer:ArrayBuffer) => {
                (<WebAudio>Audio).decodeAudioData(asset.guid, buffer, () => {
                    asset.buffer = buffer;
                    callback(asset);
                }, () => {});
            }, () => {});
        }

    }

}