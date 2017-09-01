namespace zen {

    export abstract class Asset {

        private _guid:string = zen.guid.create();

        public get guid():string {
            return this._guid;
        }

        private _name:string = "";

        public get name():string {
            return this._name;
        }

        constructor(name:string) {
            this._name = name;
        }

        public abstract serialize():string;

        public abstract deserialize(data:string):void;

        public abstract dispose():void;

    }

}