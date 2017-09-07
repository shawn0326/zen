/// <reference path="web/audio/WebAudio.ts" />
/// <reference path="web/gl/WebGL.ts" />
/// <reference path="web/http/Http.ts" />

namespace zen {

    export let Audio:sound.IAudio = new web.WebAudio();
    export let Renderer:renderer.IRenderer = new web.WebGL();
    export let FileReader:io.IFileReader = new web.Http();

    export class Application {

        public sceneManager:SceneManager = new SceneManager();

        public systemManager:SystemManager = new SystemManager();

        public inputManager:InputManager = new InputManager();

        public assetManager:AssetManager = new AssetManager();

        constructor() {
            // platform
            Audio.init();
            Renderer.init({});
            FileReader.init();

            // logic
            this.systemManager.addSystem(ComponentType.Camera, new CameraComponentSystem(this));
            this.systemManager.addSystem(ComponentType.MeshFilter, new MeshFilterComponentSystem(this));
            this.systemManager.addSystem(ComponentType.AudioSource, new AudioSourceSystem(this));
            this.systemManager.addSystem(ComponentType.AudioListener, new AudioListenerSystem(this));
            
            // script
            this.systemManager.addSystem(ComponentType.Script, new ScriptComponentSystem(this));

            // renderer
            this.systemManager.addSystem(ComponentType.MeshRenderer, new MeshRendererComponentSystem(this));

            this.loopHandler = this.loop.bind(this);
        }

        public start() {
            this.sceneManager.loadLevel(new Scene(this));

            this.timeInfo.startTime = Date.now() / 1000;
            this.timeInfo.lastFrameTime = Date.now() / 1000;

            this.loop(0);
        }

        private loopHandler:FrameRequestCallback;

        private timeInfo = {startTime: 0, lastFrameTime: 0};

        private loop(deltaTime:number) {
            requestAnimationFrame(this.loopHandler);

            let now = Date.now() / 1000;

            let delta = now - this.timeInfo.lastFrameTime;

            this.doUpdate(delta);

            this.doRender();

            this.timeInfo.lastFrameTime = now;
        }

        private doUpdate(deltaTime:number) {
            this.systemManager.update(deltaTime);
            this.inputManager.update(deltaTime);
        }

        private doRender() {

        }

    }

}