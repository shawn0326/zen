namespace zen {
    
    export class AssetManager {

        private _assetsMap: {[key:string]: Asset} = {};

        public getAsset(name:string):Asset {
            return this._assetsMap[name];
        }

        public loadAssets(config:{url:string}[], callback:() => {}) {
            // TODO
            callback();
        }

    }

}