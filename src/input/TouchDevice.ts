namespace zen.input {

    export enum TouchPhase {
        BEGAN,
        MOVED,
        STATIONARY,
        ENDED,
        CANCELED
    }

    export class TouchPoint {

        public altitudeAngle:number = Math.PI / 2; // Value of 0 radians indicates that the stylus is parallel to the surface, pi/2 indicates that it is perpendicular.
        public azimuthAngle:number = 0; // Value of 0 radians indicates that the stylus is pointed along the x-axis of the device.
        public deltaPosition:math.Vector2 = new math.Vector2(); // The position delta since last change.
        // public deltaTime:number = 0; // TODO Amount of time that has passed since the last recorded change in Touch values.
        public fingerId:number = 0; // The unique index for the touch.
        public maximumPossiblePressure:number = 1.0; // The maximum possible pressure value for a platform. If Input.touchPressureSupported returns false, the value of this property will always be 1.0f.
        public phase:TouchPhase; //	Describes the phase of the touch.
        public position:math.Vector2 = new math.Vector2(); // The position of the touch in pixel coordinates.
        public pressure = 1.0; //	The current amount of pressure being applied to a touch. 1.0f is considered to be the pressure of an average touch. If Input.touchPressureSupported returns false, the value of this property will always be 1.0f.

        public radius:math.Vector2 = new math.Vector2(); // ADD: different from Unity
        // public radius:number = 0; // DELETE: An estimated value of the radius of a touch. Add radiusletiance to get the maximum touch size, subtract it to get the minimum touch size.
        // public radiusletiance:number = 0; // DELETE: The amount that the radius leties by for a touch.
        // public rawPosition:math.Vector2 = new math.Vector2(); // DELETE: The raw position used for the touch.

        // public tapCount:number = 0; // TODO Number of taps.
        public type:string = "Direct"; // A value that indicates whether a touch was of Direct, Indirect (or remote), or Stylus type.

        public set(touch:any, phase:TouchPhase) {
            this.altitudeAngle = touch.rotationAngle;
            this.azimuthAngle = touch.rotationAngle;

            if(phase == TouchPhase.BEGAN || phase == TouchPhase.STATIONARY) {
                this.deltaPosition.x = 0;
                this.deltaPosition.y = 0;
            } else {
                this.deltaPosition.x = touch.clientX - this.position.x;
                this.deltaPosition.y = touch.clientY - this.position.y;
            }

            // this.deltaTime;
            this.fingerId = touch.identifier;
            this.phase = phase;
            this.position.x = touch.clientX;
            this.position.y = touch.clientY;
            this.pressure = touch.force;
            this.radius.x = touch.radiusX;
            this.radius.y = touch.radiusY;
            // this.tapCount;
        }

        private static _pointPool:TouchPoint[] = [];

        public static create():TouchPoint {
            return this._pointPool.pop() || new TouchPoint();
        }

        public static release(touchPoint:TouchPoint) {
            this._pointPool.push(touchPoint);
        }

    }

    export class TouchDevice {

        private _touchesMap:{[key:number]:TouchPoint} = {};

        private _touches:TouchPoint[] = [];
        
        public touchCount = 0;

        private _startHandler:EventListener = this._handleTouchStart.bind(this);
        private _endHandler:EventListener = this._handleTouchEnd.bind(this);
        private _moveHandler:EventListener = this._handleTouchMove.bind(this);
        private _cancelHandler:EventListener = this._handleTouchCancel.bind(this);

        private _element: HTMLElement | null = null;

        constructor(element: HTMLElement) {
            this.attach(element);
        }

        private attach(element: HTMLElement) {
            if (this._element) {
                this.detach();
            }
            this._element = element;
            this._element.addEventListener('touchstart', this._startHandler, false);
            this._element.addEventListener('touchend', this._endHandler, false);
            this._element.addEventListener('touchmove', this._moveHandler, false);
            this._element.addEventListener('touchcancel', this._cancelHandler, false);
        }

        private detach() {
            if(!this._element) return;
            this._element.removeEventListener('touchstart', this._startHandler, false);
            this._element.removeEventListener('touchend', this._endHandler, false);
            this._element.removeEventListener('touchmove', this._moveHandler, false);
            this._element.removeEventListener('touchcancel', this._cancelHandler, false);
            this._element = null;
        }

        public update() {
            for(let i in this._touchesMap) {
                let touch = this._touchesMap[i];

                if(touch.phase === TouchPhase.BEGAN) {
                    touch.phase = TouchPhase.STATIONARY;
                }

                if(touch.phase === TouchPhase.ENDED || touch.phase === TouchPhase.CANCELED) {
                    delete this._touchesMap[i];
                    let index = this._touches.indexOf(touch);
                    if(index > -1) {
                        this._touches.splice(index, 1);
                    }
                    this.touchCount--;
                }
            }
        }

        public getTouch(index:number):TouchPoint {
            return this._touches[index];
        }

        private _getTouch(identifier:number):TouchPoint {
            let touchPoint = this._touchesMap[identifier];
            if(!touchPoint) {
                touchPoint = TouchPoint.create();
                this._touchesMap[identifier] = touchPoint;
                this._touches.push(touchPoint);
                this.touchCount++;
            }

            return touchPoint;
        }

        private _handleTouchStart(event:TouchEvent) {
            for(let i = 0; i < event.changedTouches.length; i++) {
                let touch = event.changedTouches[i];
                let identifier = touch.identifier;
                let touchPoint = this._getTouch(identifier);

                touchPoint.set(touch, TouchPhase.BEGAN);
            }
        }

        private _handleTouchEnd(event:TouchEvent) {
            for(let i = 0; i < event.changedTouches.length; i++) {
                let touch = event.changedTouches[i];
                let identifier = touch.identifier;
                let touchPoint = this._getTouch(identifier);

                touchPoint.set(touch, TouchPhase.ENDED);
            }
        }

        private _handleTouchMove(event:TouchEvent) {
            // call preventDefault to avoid issues in Chrome Android:
            // http://wilsonpage.co.uk/touch-events-in-chrome-android/
            event.preventDefault();

            for(let i = 0; i < event.changedTouches.length; i++) {
                let touch = event.changedTouches[i];
                let identifier = touch.identifier;
                let touchPoint = this._getTouch(identifier);

                touchPoint.set(touch, TouchPhase.MOVED);
            }
        }

        private _handleTouchCancel(event:TouchEvent) {
            for(let i = 0; i < event.changedTouches.length; i++) {
                let touch = event.changedTouches[i];
                let identifier = touch.identifier;
                let touchPoint = this._getTouch(identifier);

                touchPoint.set(touch, TouchPhase.CANCELED);
            }
        }
    }

}