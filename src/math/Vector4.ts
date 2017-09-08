namespace zen.math {

    export class Vector4 {

        public x:number;
        public y:number;
        public z:number;
        public w:number;

        constructor(x:number = 0, y:number = 0, z:number = 0, w:number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }

        public set(x:number, y:number, z:number, w:number):Vector4 {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
            return this;
        }

        public add(v:Vector4):Vector4 {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            this.w += v.w;
            return this;
        }

        public sub(v:Vector4):Vector4 {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            this.w -= v.w;
            return this;
        }

        public mul(v:Vector4):Vector4 {
            this.x * v.x;
            this.y *= v.y;
            this.z *= v.z;
            this.w *= v.w;
            return this;
        }

        public copy(v:Vector4):Vector4 {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            this.w = v.w;
            return this;
        }

    }

}