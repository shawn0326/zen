/// <reference path="../Component.ts" />

namespace zen {

    export class CameraComponent extends Component {

        public readonly type: ComponentType = ComponentType.Camera;

        public far: number = 1000;

        public near: number = 0.1;

        public fov: number = Math.PI * 0.25;

        public size: number = 2;

        public projection: CameraProjection = CameraProjection.PERSPECTIVE;

        public viewportRect: math.Vector4 = new math.Vector4(0, 0, 1, 1);

        public priority: number = 0;

        public cullingMask: CullingMask = CullingMask.Everything;

        public frustumCulling: boolean = true;

        public clearColor: boolean = true;

        public clearDepth: boolean = true;

        public clearStencil: boolean = true;

        public background: math.Color = new math.Color(0.5, 0.5, 0.5, 1);

        public getProjectionMatrix(aspectRatio: number, out: math.Matrix4 = new math.Matrix4()): math.Matrix4 {
            return out;
        }

        public getViewMatrix(out: math.Matrix4 = new math.Matrix4()): math.Matrix4 {
            return out;
        }

    }

}