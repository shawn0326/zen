namespace zen {
    
    export class SceneManager {

        private _activeScene:Scene;

        get activeScene():Scene {
            return this._activeScene;
        }

        public loadLevel(scene:Scene) {
            if(this._activeScene) {
                this._activeScene.inactivate();
            }

            scene.activate();
            this._activeScene = scene;
        }

    }

}