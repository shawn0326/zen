/// <reference path="../Component.ts" />

namespace zen {

    export class ScriptComponent extends Component {

        public readonly type:ComponentType = ComponentType.Script;

        public update(app:Application, deltaTime:number) {
            for(let i = 0; i < this._scripts.length; i++) {
                let script = this._scripts[i];
                if(script.state == ScriptState.NEW) {
                    this._scripts[i].start(app);
                    script.state = ScriptState.INITIALIZED;
                } else if(script.state == ScriptState.INITIALIZED) {
                    this._scripts[i].update(deltaTime);
                }
            }
        }

        private _scripts:Behaviour[] = [];

        public addScript(script:Behaviour) {
            script.state = ScriptState.NEW;
            script.component = this;
            this._scripts.push(script);
        }

        public removeScript(script:Behaviour) {
            for(let i = 0; i < this._scripts.length; i++) {
                let _script = this._scripts[i];
                if(_script == script) {
                    script.component = null;
                    this._scripts.splice(i, 1);
                    break;
                }
            }
        }

    }

}