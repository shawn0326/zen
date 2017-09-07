namespace zen {

    export class ShaderAsset extends Asset {

        public vs:string;

        public fs:string;
        
        public serialize():string {
            return "";
        }

        public deserialize(data:string) {
            let json = JSON.parse(data);
            this.vs = json.vs;
            this.fs = json.fs;
        }

        public dispose() {
            
        }
        
    }

}