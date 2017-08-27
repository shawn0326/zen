namespace zen {

    export class Transform3D {
        private localMatrix:math.Matrix4;

        private worldMatrix:math.Matrix4;

        private localPosition:math.Vector3;

        public getLocalPosition():math.Vector3 {
            return this.localPosition;
        }

        public setLocalPosition(x:number, y:number, z:number) {
            
        }

        private localRotation:math.Quaternion;

        public getLocalRotation():math.Quaternion {
            return this.localRotation;
        }

        public setLocalRotation(x:number, y:number, z:number, w:number) {
            
        }

        private localScale:math.Vector3;

        public getLocalScale():math.Vector3 {
            return this.localScale;
        }

        public setLocalScale(x:number, y:number, z:number) {
            
        }

        protected children:GameObject[] = [];

        public addChild(child:GameObject) {
            this.children.push(child);
        }

        public removeChild(child:GameObject) {
            for(let i = 0; i < this.children.length; i++) {
                let _child = this.children[i];
                if(_child == child) {
                    this.children.splice(i, 1);
                    break;
                }
            }
        }
    }

}