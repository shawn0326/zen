namespace zen {

    export abstract class Component {
        public abstract readonly type:ComponentType | number;

        gameObject:GameObject | null;
    }

}