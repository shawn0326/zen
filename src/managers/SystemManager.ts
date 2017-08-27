namespace zen {
    
    export class SystemManager {

        private _systems: {[key:string]: System} = {};

        public getSystem(key:ComponentType | number):System {
            return this._systems[key];
        }

        public addSystem(key:ComponentType | number, system:System):void {
            if(!this._systems[key]) {
                this._systems[key] = system;
            } else {
                console.error("ComponentSystem name " + key + " already registered or not allowed");
            }
        }

        public removeSystem(key:ComponentType | number):void {
            if(!this._systems[key]) {
                console.error("No ComponentSystem named " + key + " registered");
            }

            delete this._systems[key];
        }

        public update(deltaTime:number) {
            for(let key in this._systems) {
                this._systems[key].update(deltaTime);
            }
        }

    }

}