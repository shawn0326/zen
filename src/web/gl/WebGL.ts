namespace zen.web {

    export class WebGL implements renderer.IRenderer {

        public glContext:WebGLRenderingContext;

        public init(options:any = {}) {
            let _canvas = options.canvas;

            if(_canvas == undefined) {
                _canvas = document.getElementById("zen") as HTMLCanvasElement;
            }

            let _GLContext = _canvas.getContext('webgl') || _canvas.getContext("experimental-webgl");
            if (!!_GLContext) {
                this.glContext = _GLContext;
                console.log("GLContext inited --> ");
                console.log(this.glContext);
            } else {
                console.error("!Your browser does not support WebGLContext");
            }
        }
    }

}