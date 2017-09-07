/// <reference path="math/Vector3.ts" />
/// <reference path="math/Matrix4.ts" />
/// <reference path="math/Quaternion.ts" />

namespace zen {

    let helpVec3 = new math.Vector3();
    let helpMat4 = new math.Matrix4();
    let helpQuat4 = new math.Quaternion();
    let helpQuat4_2 = new math.Quaternion();

    export class Transform3D {

        private _enabled: boolean = true;

        private _enabledInHierarchy: boolean = false;

        public get enabled(): boolean {
            return this._enabled && this._enabledInHierarchy;
        }

        public set enabled(enabled: boolean) {
            if (this._enabled !== enabled) {
                this._enabled = enabled;

                if (!this._parent || this._parent.enabled) {
                    this._notifyHierarchyStateChanged(this, enabled);
                }
            }
        }

        public set enabledInHierarchy(enabled: boolean) {
            this._enabledInHierarchy = enabled;
        }

        private _notifyHierarchyStateChanged(transform3D: Transform3D, enabled: boolean) {
            transform3D._onHierarchyStateChanged(enabled);

            let children = transform3D._children;
            for (let i = 0, len = children.length; i < len; i++) {
                if (children[i]._enabled) {
                    this._notifyHierarchyStateChanged(children[i], enabled);
                }
            }
        }

        private _onHierarchyStateChanged(enabled: boolean) {
            this._enabledInHierarchy = enabled;
        }

        private _dirtyLocal: boolean = true;

        private localMatrix: math.Matrix4 = new math.Matrix4();

        public getLocalMatrix(): math.Matrix4 {
            if (this._dirtyLocal) {
                this.localMatrix.setTRS(this.localPosition, this.localRotation, this.localScale);
                this._dirtyLocal = false;
            }
            return this.localMatrix;
        }

        private _dirtyWorld: boolean = true;

        private worldMatrix: math.Matrix4 = new math.Matrix4();

        public getWorldMatrix(): math.Matrix4 {
            if (!this._dirtyLocal && !this._dirtyWorld) {
                return this.worldMatrix;
            }

            if (this._parent) {
                this._parent.getWorldMatrix();
            }

            this._sync();

            return this.worldMatrix;
        }

        private _sync() {
            if (this._dirtyLocal) {
                this.localMatrix.setTRS(this.localPosition, this.localRotation, this.localScale);
                this._dirtyLocal = false;
            }

            if (this._dirtyWorld) {
                if (this._parent === null) {
                    this.worldMatrix.copy(this.localMatrix);
                } else {
                    this.worldMatrix.mul2(this._parent.worldMatrix, this.localMatrix);
                }
                this._dirtyWorld = false;
            }
        }

        private _dirtify(local: boolean = false) {
            if ((!local || (local && this._dirtyLocal)) && this._dirtyWorld) {
                return;
            }
            if (local) {
                this._dirtyLocal = true;
            }
            if (!this._dirtyWorld) {
                this._dirtyWorld = true;
                let i = this._children.length;
                while (i--) {
                    if (this._children[i]._dirtyWorld) {
                        continue;
                    }
                    this._children[i]._dirtify();
                }
            }
            // transform dirty
        }

        private localPosition: math.Vector3 = new math.Vector3();

        public getLocalPosition(): math.Vector3 {
            return this.localPosition;
        }

        public setLocalPosition(v: math.Vector3): void;
        public setLocalPosition(x: number, y: number, z: number): void;
        public setLocalPosition(p1: math.Vector3 | number, p2?: number, p3?: number): void {
            if (p1 instanceof math.Vector3) {
                this.localPosition.copy(p1);
            } else {
                this.localPosition.set(p1, p2 || 0, p3 || 0);
            }
            if (!this._dirtyLocal) {
                this._dirtify(true);
            }
        }

        private localScale: math.Vector3 = new math.Vector3(1, 1, 1);

        public getLocalScale(): math.Vector3 {
            return this.localScale;
        }

        public setLocalScale(v: math.Vector3): void;
        public setLocalScale(x: number, y: number, z: number): void;
        public setLocalScale(p1: math.Vector3 | number, p2?: number, p3?: number): void {
            if (p1 instanceof math.Vector3) {
                this.localScale.copy(p1);
            } else {
                this.localScale.set(p1, p2 || 1, p3 || 1);
            }
            if (!this._dirtyLocal) {
                this._dirtify(true);
            }
        }

        private localRotation: math.Quaternion = new math.Quaternion();

        public getLocalRotation(): math.Quaternion {
            return this.localRotation;
        }

        public setLocalRotation(v: math.Quaternion): void;
        public setLocalRotation(x: number, y: number, z: number, w: number): void;
        public setLocalRotation(p1: math.Quaternion | number, p2?: number, p3?: number, p4?: number): void {
            if (p1 instanceof math.Quaternion) {
                this.localRotation.copy(p1);
            } else {
                this.localRotation.set(p1, p2 || 0, p3 || 0, p4 || 1);
            }
            if (!this._dirtyLocal) {
                this._dirtify(true);
            }
        }

        private position: math.Vector3 = new math.Vector3();

        public getPosition(): math.Vector3 {
            this.getWorldMatrix().getTranslation(this.position);
            return this.position;
        }

        public setPosition(v: math.Vector3): void;
        public setPosition(x: number, y: number, z: number): void;
        public setPosition(p1: math.Vector3 | number, p2?: number, p3?: number): void {
            if (p1 instanceof math.Vector3) {
                helpVec3.copy(p1);
            } else {
                helpVec3.set(p1, p2 || 0, p3 || 0);
            }
            if (this._parent === null) {
                this.localPosition.copy(helpVec3);
            } else {
                helpMat4.copy(this._parent.getWorldMatrix()).invert();
                helpMat4.transformPoint(helpVec3, this.localPosition);
            }
            if (!this._dirtyLocal) {
                this._dirtify(true);
            }
        }

        private scale: math.Vector3 = new math.Vector3(1, 1, 1);

        public getScale(): math.Vector3 {
            this.getWorldMatrix().getScale(this.scale);
            return this.scale;
        }

        public setScale(v: math.Vector3): void;
        public setScale(x: number, y: number, z: number): void;
        public setScale(p1: math.Vector3 | number, p2?: number, p3?: number): void {
            if (p1 instanceof math.Vector3) {
                helpVec3.copy(p1);
            } else {
                helpVec3.set(p1, p2 || 1, p3 || 1);
            }
            if (this._parent === null) {
                this.localScale.copy(helpVec3);
            } else {
                helpMat4.copy(this._parent.getWorldMatrix()).invert();
                helpMat4.transformVector(helpVec3, this.localScale);
            }
            if (!this._dirtyLocal) {
                this._dirtify(true);
            }
        }

        private rotation: math.Quaternion = new math.Quaternion();

        public getRotation(): math.Quaternion {
            this.rotation.setFromMatrix4(this.getWorldMatrix());
            return this.rotation;
        }

        public setRotation(v: math.Quaternion): void;
        public setRotation(x: number, y: number, z: number, w: number): void;
        public setRotation(q1: math.Quaternion | number, q2?: number, q3?: number, q4?: number): void {
            if (q1 instanceof math.Quaternion) {
                helpQuat4.copy(q1);
            } else {
                helpQuat4.set(q1, q2 || 0, q3 || 0, q4 || 1);
            }

            if (this._parent === null) {
                this.localRotation.copy(helpQuat4);
            } else {
                let parentRot = this._parent.getRotation();
                helpQuat4_2.copy(parentRot).invert();
                this.localRotation.copy(helpQuat4_2).mul(helpQuat4);
            }

            if (!this._dirtyLocal) {
                this._dirtify(true);
            }
        }

        private _children: Transform3D[] = [];

        private _parent: Transform3D | null = null;

        public addChild(child: Transform3D) {
            child._parent = this;
            this._children.push(child);

            var enabledInHierarchy = (child._enabled && this.enabled);
            if (child._enabledInHierarchy !== enabledInHierarchy) {
                child._enabledInHierarchy = enabledInHierarchy;
                child._notifyHierarchyStateChanged(child, enabledInHierarchy);
                child._dirtify();
            }
        }

        public removeChild(child: Transform3D) {
            for (let i = 0; i < this._children.length; i++) {
                let _child = this._children[i];
                if (_child == child) {
                    _child._parent = null;
                    this._children.splice(i, 1);
                    _child._notifyHierarchyStateChanged(_child, false);
                    break;
                }
            }
        }
    }

}