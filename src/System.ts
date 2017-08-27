namespace zen {

    export abstract class System {

        protected _app:Application;

        constructor(app:Application) {
            this._app = app;
        }

        protected _components:{[key:string]:Component} = {};

        addComponent(gameObject:GameObject, component:Component) {
            this._components[gameObject.guid] = component;
        }

        removeComponent(gameObject:GameObject) {
            delete this._components[gameObject.guid];
        }

        getComponent(gameObject:GameObject):Component {
            return this._components[gameObject.guid];
        }

        abstract update(deltaTime:number):void;

    }

}