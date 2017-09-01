namespace zen {

    export abstract class Component {
        public abstract readonly type:ComponentType | number;

        gameObject:GameObject | null;

        private _enabled:boolean = true;

        public get enabled():boolean {
            return this._enabled && !!this.gameObject && this.gameObject.enabled;
        }

        public set enabled(enabled:boolean) {
            this._enabled = enabled
        }
    }

}