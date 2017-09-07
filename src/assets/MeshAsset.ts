namespace zen {

    export type MeshInfo = {start: 0, count: 0, materialId: 0};

    export class MeshAsset extends Asset {

        private subMeshes:MeshInfo[] = [];

        public vertices:Float32Array | null = null;

        public indices:Uint16Array | null = null;

        public getSubMeshes():MeshInfo[] {
            return this.subMeshes;
        }
        
        public serialize():string {
            return "";
        }

        public deserialize(data:string) {
            let json = JSON.parse(data);

            // position / normal / uv
            let temp = [];
            for(let i3 = 0, i2 = 0; i3 < json.position.length - 1; i3 += 3, i2 += 2) {
                // position
                temp.push(json.position[i3 + 0]);
                temp.push(json.position[i3 + 1]);
                temp.push(json.position[i3 + 2]);
                // normal
                temp.push(json.normal[i3 + 0]);
                temp.push(json.normal[i3 + 1]);
                temp.push(json.normal[i3 + 2]);
                // uv
                temp.push(json.uv[i2 + 0]);
                temp.push(json.uv[i2 + 1]);
            }
            this.vertices = new Float32Array(temp);

            // indices
            this.indices = new Uint16Array(json.indices);

            // sub
            for(let i = 0; i < json.sub.length; i++) {
                this.subMeshes.push({
                    start: json.sub[i].start,
                    count: json.sub[i].count,
                    materialId: json.sub[i].materialId
                });
            }
        }

        public dispose() {
            this.subMeshes = [];
            this.vertices = null;
            this.indices = null;
        }
        
    }

}