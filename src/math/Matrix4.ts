namespace zen.math {
    export class Matrix4 {

        public data:Float32Array;

        constructor();
        constructor(data:number[]);
        constructor(...data:number[]);
        constructor(value?:any, ...restOfValue:number[]) {
            if(value && value.length === 16) {
                this.data = new Float32Array(value);
                return;
            }

            this.data = new Float32Array(16);

            if(typeof(value) === "number" && restOfValue.length === 15) {
                this.data[0] = value;
                for(let i = 0; i < 15; i++) {
                    this.data[i + 1] = restOfValue[i];
                }
            } else {
                this.identify();
            }
        }

        public identify():Matrix4 {
            this.data.set([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
            return this;
        }

        public invert():Matrix4 {
            // TODO
            return this;
        }

        public setTRS(t:Vector3, r:Quaternion, s:Vector3):Matrix4 {
            let tx, ty, tz, qx, qy, qz, qw, sx, sy, sz,
                x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;
            
            tx = t.x;
            ty = t.y;
            tz = t.z;

            qx = r.x;
            qy = r.y;
            qz = r.z;
            qw = r.w;

            sx = s.x;
            sy = s.y;
            sz = s.z;

            x2 = qx + qx;
            y2 = qy + qy;
            z2 = qz + qz;
            xx = qx * x2;
            xy = qx * y2;
            xz = qx * z2;
            yy = qy * y2;
            yz = qy * z2;
            zz = qz * z2;
            wx = qw * x2;
            wy = qw * y2;
            wz = qw * z2;

            m = this.data;

            m[0] = (1 - (yy + zz)) * sx;
            m[1] = (xy + wz) * sx;
            m[2] = (xz - wy) * sx;
            m[3] = 0;

            m[4] = (xy - wz) * sy;
            m[5] = (1 - (xx + zz)) * sy;
            m[6] = (yz + wx) * sy;
            m[7] = 0;

            m[8] = (xz + wy) * sz;
            m[9] = (yz - wx) * sz;
            m[10] = (1 - (xx + yy)) * sz;
            m[11] = 0;

            m[12] = tx;
            m[13] = ty;
            m[14] = tz;
            m[15] = 1;

            return this;
        }
        
        public getTranslation(v:Vector3 = new math.Vector3()):Vector3 {
            return v.set(this.data[12], this.data[13], this.data[14]);
        }

        public getScale(v:Vector3 = new math.Vector3()):Vector3 {
            // TODO
            return v.set(1, 1, 1);
        }

        public copy(m:Matrix4):Matrix4 {
            this.data.set(m.data);
            return this;
        }

        public mul2(lhs:Matrix4, rhs:Matrix4):Matrix4 {
            let a00, a01, a02, a03,
                a10, a11, a12, a13,
                a20, a21, a22, a23,
                a30, a31, a32, a33,
                b0, b1, b2, b3,
                a = lhs.data,
                b = rhs.data,
                r = this.data;
            
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            a30 = a[12];
            a31 = a[13];
            a32 = a[14];
            a33 = a[15];

            b0 = b[0];
            b1 = b[1];
            b2 = b[2];
            b3 = b[3];
            r[0]  = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
            r[1]  = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
            r[2]  = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
            r[3]  = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

            b0 = b[4];
            b1 = b[5];
            b2 = b[6];
            b3 = b[7];
            r[4]  = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
            r[5]  = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
            r[6]  = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
            r[7]  = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

            b0 = b[8];
            b1 = b[9];
            b2 = b[10];
            b3 = b[11];
            r[8]  = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
            r[9]  = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
            r[10] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
            r[11] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

            b0 = b[12];
            b1 = b[13];
            b2 = b[14];
            b3 = b[15];
            r[12] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
            r[13] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
            r[14] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
            r[15] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

            return this;
        }

        public transformPoint(vec:Vector3, res:Vector3 = new Vector3()):Vector3 {
            let x, y, z,
                m = this.data;

            x =
                vec.x * m[0] +
                vec.y * m[4] +
                vec.z * m[8] +
                m[12];
            y =
                vec.x * m[1] +
                vec.y * m[5] +
                vec.z * m[9] +
                m[13];
            z =
                vec.x * m[2] +
                vec.y * m[6] +
                vec.z * m[10] +
                m[14];

            return res.set(x, y, z);
        }

        public transformVector(vec:Vector3, res:Vector3 = new Vector3()):Vector3 {
            let x, y, z,
                m = this.data;

            x =
                vec.x * m[0] +
                vec.y * m[4] +
                vec.z * m[8];
            y =
                vec.x * m[1] +
                vec.y * m[5] +
                vec.z * m[9];
            z =
                vec.x * m[2] +
                vec.y * m[6] +
                vec.z * m[10];

            return res.set(x, y, z);
        }
    }
}