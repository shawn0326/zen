namespace zen.math {

    export class Quaternion {

        public x:number;
        public y:number;
        public z:number;
        public w:number;

        constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 1) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
        
        public set(x:number, y:number, z:number, w:number):Quaternion {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
            return this;
        }

        public setFromMatrix4(matrix:Matrix4):Quaternion {
            // TODO
            return this;
        }

        public invert():Quaternion {
            // TODO
            return this;
        }

        public mul(q:Quaternion):Quaternion {
            // TODO
            return this;
        }

        public copy(q:Quaternion):Quaternion {
            this.x = q.x;
            this.y = q.y;
            this.z = q.z;
            this.w = q.w;
            return this;
        }
    }

}