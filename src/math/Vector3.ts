namespace zen.math {

    export class Vector3 {

        public x:number;
        public y:number;
        public z:number;

        constructor(x:number = 0, y:number = 0, z:number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public set(x:number, y:number, z:number):Vector3 {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        }

        public add(v:Vector3):Vector3 {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }

        public sub(v:Vector3):Vector3 {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
            return this;
        }

        public mul(v:Vector3):Vector3 {
            this.x * v.x;
            this.y *= v.y;
            this.z *= v.z;
            return this;
        }

    }

}