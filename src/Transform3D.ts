namespace zen {

    export class Transform3D {

        private _enabled:boolean = true;

        private _enabledInHierarchy:boolean = false;

        public get enabled():boolean {
            return this._enabled && this._enabledInHierarchy;
        }

        public set enabled(enabled:boolean) {
            if (this._enabled !== enabled) {
                this._enabled = enabled;

                if (!this._parent || this._parent.enabled) {
                    this._notifyHierarchyStateChanged(this, enabled);
                }
            }
        }

        public set enabledInHierarchy(enabled:boolean) {
            this._enabledInHierarchy = enabled;
        }

        private _notifyHierarchyStateChanged(transform3D:Transform3D, enabled:boolean) {
            transform3D._onHierarchyStateChanged(enabled);

            let children = transform3D._children;
            for (let i = 0, len = children.length; i < len; i++) {
                if (children[i]._enabled) {
                    this._notifyHierarchyStateChanged(children[i], enabled);
                }
            }
        }

        private _onHierarchyStateChanged(enabled:boolean) {
            this._enabledInHierarchy = enabled;
        }

        private localMatrix:math.Matrix4 = new math.Matrix4();

        private worldMatrix:math.Matrix4 = new math.Matrix4();

        private localPosition:math.Vector3 = new math.Vector3();

        public getLocalPosition():math.Vector3 {
            return this.localPosition;
        }

        public setLocalPosition(x:number, y:number, z:number) {
            
        }

        private localRotation:math.Quaternion = new math.Quaternion();

        public getLocalRotation():math.Quaternion {
            return this.localRotation;
        }

        public setLocalRotation(x:number, y:number, z:number, w:number) {
            
        }

        private localScale:math.Vector3 = new math.Vector3();

        public getLocalScale():math.Vector3 {
            return this.localScale;
        }

        public setLocalScale(x:number, y:number, z:number) {
            
        }

        public getPosition():math.Vector3 {
            return this.localPosition;
        }

        public setPosition(x:number, y:number, z:number) {
            this.localPosition.set(x, y, z);
        }

        private _children:Transform3D[] = [];

        private _parent:Transform3D | null;

        public addChild(child:Transform3D) {
            child._parent = this;
            this._children.push(child);

            var enabledInHierarchy = (child._enabled && this.enabled);
            if (child._enabledInHierarchy !== enabledInHierarchy) {
                child._enabledInHierarchy = enabledInHierarchy;
                child._notifyHierarchyStateChanged(child, enabledInHierarchy);
            }
        }

        public removeChild(child:Transform3D) {
            for(let i = 0; i < this._children.length; i++) {
                let _child = this._children[i];
                if(_child == child) {
                    _child._parent = null;
                    this._children.splice(i, 1);
                    _child._notifyHierarchyStateChanged(_child, false);
                    break;
                }
            }
        }
    }

}