namespace zen {

    enum AssetType {
        UNKNOW,
        SOUND
    }
    
    export class AssetManager {

        private _assetsMap: {[key:string]: Asset} = {};

        constructor() {
            let defaultCubeMesh = new MeshAsset("cube_mesh");
            defaultCubeMesh.deserialize(zen.def.cube_mesh);
            this._assetsMap["def::cube"] = defaultCubeMesh;

            let defaultDiffuseShader = new ShaderAsset("diffuse_shader");
            defaultDiffuseShader.deserialize(zen.def.diffuse_shader);
            this._assetsMap["def::diffuse"] = defaultDiffuseShader;
        }

        public getAsset<T extends Asset>(name:string):T {
            return <T>this._assetsMap[name];
        }

        public async loadAssets(config:{url:string}[], onProgress?:(event:{current:number, total:number}) => void, onLoaded?:() => void) {
            let len:number = config.length;
            let count:number = 0;
            while(count < len) {
                await this.loadAsset(config[count].url);
                count++;
                onProgress && onProgress({current: count, total: len});
            }
            onLoaded && onLoaded();
        }

        private loadAsset(url:string):Promise<{}>  {
            return new Promise((resolve, reject) => {
                let name = this.getFileName(url);
                let type = this.getFileType(url);
                if(type == AssetType.SOUND) {
                    FileReader.loadSound(name, url, (asset:AudioAsset) => {
                        this._assetsMap[url] = asset;
                        resolve();
                    });
                } else {
                    reject();
                }
            });
        }

        private getFileName(url:string):string {
            let index = url.lastIndexOf("/");
            let name = url.substr(index + 1);
            return name;
        }

        private getFileType(url:string):AssetType {
            let index = url.lastIndexOf(".");
            let name = url.substr(index + 1);
            if(name === "ogg" || name === "mp3") {
                return AssetType.SOUND
            }
            return AssetType.UNKNOW;
        }

    }

}