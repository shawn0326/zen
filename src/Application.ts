namespace zen {

    export class Application {

        public sceneManager:SceneManager = new SceneManager();

        public systemManager:SystemManager = new SystemManager();

        public inputManager:InputManager = new InputManager();

        constructor() {
            this.systemManager.addSystem(ComponentType.Camera, new CameraComponentSystem(this));
            this.systemManager.addSystem(ComponentType.Script, new ScriptComponentSystem(this));

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