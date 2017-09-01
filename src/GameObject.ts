/// <reference path="Transform3D.ts" />

namespace zen {

    export class GameObject extends Transform3D {

        public name:string = "GameObject";

        public tag:string = "";

        public layer:string = "";

        private _guid:string = zen.guid.create();

        public get guid() {
            return this._guid;
        }

        private _app:Application;

        constructor(app:Application) {
            super();
            this._app = app;
        }

        private _components:{[key:string]:Component} = {};

        public addComponent(component:Component):void {
            let system:System = this._app.systemManager.getSystem(component.type);
            if(system) {
                if(!this._components[component.type]) {
                    component.gameObject = this;
                    system.addComponent(this, component);
                    this._components[component.type] = component;
                } else {
                    console.error("Game Object already has " + component.type + " Component");
                }
            } else {
                console.error("System: " + component.type + " doesn't exist");
            }
        }

        public getComponent<T extends Component>(type:ComponentType | number):T {
            return <T>this._components[type];
        }

        public removeComponent(component:Component):void {
            let system:System = this._app.systemManager.getSystem(component.type);
            if(system) {
                if(this._components[component.type]) {
                    component.gameObject = null;
                    system.removeComponent(this);
                    delete this._components[component.type];
                } else {
                    console.error("Game Object doesn't have " + component.type + " Component");
                }
            } else {
                console.error("System: " + component.type + " doesn't exist");
            } 
        }
    }

}