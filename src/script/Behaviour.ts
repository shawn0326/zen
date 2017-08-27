namespace zen {
    
    export class Behaviour {

        public component:ScriptComponent | null;

        public get gameObject():GameObject | null {
            if(this.component) {
                return this.component.gameObject;
            } else {
                return null;
            }
        }

        public state:ScriptState;

        public start(app:Application) {
        
        }

        public update(deltaTime:number) {

        }

    }

}