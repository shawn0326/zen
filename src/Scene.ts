namespace zen {

    export class Scene {

        private _app:Application;

        private root:GameObject;

        constructor(app:Application) {
            this._app = app;
            this.root = new GameObject(app);
            this.root.name = "scene_root";
        }

        public activate() {
            // activate this scene
        }

        public inactivate() {
            // inactivate this scene
        }

        public addChild(child:GameObject) {
            this.root.addChild(child);
        }

        public removeChild(child:GameObject) {
            this.root.removeChild(child);
        }
    }

}