namespace zen.math {

    export class Vector2 {

        public x:number;
        public y:number;

        constructor(x:number = 0, y:number = 0) {
            this.x = x;
            this.y = y;
        }

        public set(x:number, y:number):Vector2 {
            this.x = x;
            this.y = y;
            return this;
        }

        public add(v:Vector2):Vector2 {
            this.x += v.x;
            this.y += v.y;
            return this;
        }

        public sub(v:Vector2):Vector2 {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }

        public mul(v:Vector2):Vector2 {
            this.x * v.x;
            this.y *= v.y;
            return this;
        }

        public copy(v:Vector2):Vector2 {
            this.x = v.x;
            this.y = v.y;
            return this;
        }

    }

}