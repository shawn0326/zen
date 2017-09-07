namespace zen.input {

    export class MouseDevice {

        public position:math.Vector2 = new math.Vector2();

        public wheel:number = 0;

        private _buttons:boolean[] = [false, false, false];

        private _lastbuttons:boolean[] = [false, false, false];

        private _element: HTMLElement | null = null;

        private _upHandler:EventListener = this._handleUp.bind(this);
        private _moveHandler:EventListener = this._handleMove.bind(this);
        private _downHandler:EventListener = this._handleDown.bind(this);
        private _wheelHandler:EventListener = this._handleWheel.bind(this);
        private _contextMenuHandler:EventListener = function(event) {event.preventDefault()};

        constructor(element: HTMLElement) {
            this.attach(element);
        }

        public disableContextMenu() {
            if(!this._element) return;
            this._element.addEventListener("contextmenu", this._contextMenuHandler);
        }

        public enableContextMenu() {
            if(!this._element) return;
            this._element.removeEventListener("contextmenu", this._contextMenuHandler);
        }

        private attach(element: HTMLElement) {
            if (this._element) {
                this.detach();
            }
            this._element = element;
            this._element.addEventListener("mouseup", this._upHandler, false);
            this._element.addEventListener("mousemove", this._moveHandler, false);
            this._element.addEventListener("mousedown", this._downHandler, false);
            this._element.addEventListener("mousewheel", this._wheelHandler, false); // WebKit
            this._element.addEventListener("DOMMouseScroll", this._wheelHandler, false); // Gecko
        }

        private detach() {
            if(!this._element) return;
            this._element.removeEventListener("mouseup", this._upHandler, false);
            this._element.removeEventListener("mousemove", this._moveHandler, false);
            this._element.removeEventListener("mousedown", this._downHandler, false);
            this._element.removeEventListener("mousewheel", this._wheelHandler, false); // WebKit
            this._element.removeEventListener("DOMMouseScroll", this._wheelHandler, false); // Gecko
            this._element = null;
        }

        public update() {
            // Copy current button state
            this._lastbuttons[0] = this._buttons[0];
            this._lastbuttons[1] = this._buttons[1];
            this._lastbuttons[2] = this._buttons[2];
            // set wheel to 0
            this.wheel = 0;
        }

        public isPressed(button:number):boolean {
            return this._buttons[button];
        }

        public wasPressed(button:number):boolean {
            return (this._buttons[button] && !this._lastbuttons[button]);
        }

        public wasReleased(button:number):boolean {
            return (!this._buttons[button] && this._lastbuttons[button]);
        }

        private _handleUp(event:MouseEvent) {
            // disable released button
            this._buttons[event.button] = false;
        }

        private _handleMove(event:MouseEvent) {
            this.position.x = event.clientX;
            this.position.y = event.clientY;
        }

        private _handleDown(event:MouseEvent) {
            // Store which button has affected
            this._buttons[event.button] = true;
        }

        private _handleWheel(event:MouseWheelEvent) {
            // FF uses 'detail' and returns a value in 'no. of lines' to scroll
            // WebKit and Opera use 'wheelDelta', WebKit goes in multiples of 120 per wheel notch
            if (event.detail) {
                this.wheel = -1 * event.detail;
            } else if (event.wheelDelta) {
                this.wheel = event.wheelDelta / 120;
            } else {
                this.wheel = 0;
            }
        }

    }

}