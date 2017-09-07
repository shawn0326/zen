namespace zen {
    
    export class InputManager {

        public keyboard:input.KeyboardDevice;
        public mouse:input.MouseDevice;
        public touch:input.TouchDevice;

        constructor(options:any = {}) {
            let _canvas = options.canvas;

            if(_canvas == undefined) {
                _canvas = document.getElementById("zen") as HTMLCanvasElement;
            }

            this.keyboard = new input.KeyboardDevice(window);
            this.mouse = new input.MouseDevice(_canvas);
            this.touch = new input.TouchDevice(_canvas);
        }

        public update(deltaTime:number) {
            this.keyboard.update();
            this.mouse.update();
            this.touch.update();
        }

        public isPressed():boolean {
            if(this.mouse.isPressed(0)) {
                return true;
            } else {
                let t = this.touch.getTouch(0);
                if(t && this.touch.touchCount == 1) {
                    if(t.phase == input.TouchPhase.MOVED || t.phase == input.TouchPhase.STATIONARY) {
                        return true;
                    }
                }
            }
            return false;
        }

        public wasPressed():boolean {
            if(this.mouse.wasPressed(0)) {
                return true;
            } else {
                let t = this.touch.getTouch(0);
                if(t && this.touch.touchCount == 1) {
                    if(t.phase == input.TouchPhase.BEGAN) {
                        return true;
                    }
                }
            }
            return false;
        }

        public wasReleased():boolean {
            if(this.mouse.wasReleased(0)) {
                return true;
            } else {
                let t = this.touch.getTouch(0);
                if(t && this.touch.touchCount == 1) {
                    if(t.phase == input.TouchPhase.ENDED || t.phase == input.TouchPhase.CANCELED) {
                        return true;
                    }
                }
            }
            return false;
        }

        private _touchPoint:math.Vector2 = new math.Vector2();

        public getTouchPoint():math.Vector2 {
            let t = this.touch.getTouch(0);

            if(t) {
                this._touchPoint.copy(t.position);
            } else {
                this._touchPoint.copy(this.mouse.position);
            }

            return this._touchPoint;
        }  

    }

}