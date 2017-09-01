class Speak extends zen.Behaviour {
    public start(app:zen.Application) {
        console.log(app);
        console.log(this.gameObject);
        this.sayHi();
    }

    public update(deltaTime:number) {
        // console.log(deltaTime);
    }

    private async sayHi() {
        while(true) {
            await zen.waitForSeconds(1);
            console.log("hi!");
            await zen.waitForSeconds(1);
            console.log("ha!");
        }
    }
}

class Walk extends zen.Behaviour {

    public speed:number = 0;

    private count:number = 0;

    public start(app:zen.Application) {
        this.speed = 0.00001;
    }

    public update(deltaTime:number) {
        this.count += deltaTime;

        if(this.gameObject) {
            let p = this.gameObject.getPosition();
            // console.log(deltaTime);
            // this.gameObject.setPosition(0, 0, 2);
            this.gameObject.setPosition(Math.cos(this.count) * 2, 0, Math.sin(this.count) * 2);
        }

        if(this.count >= Math.PI * 2) {
            // console.log("move:" + this.count + ", speed: " + this.speed);
            this.count = 0;
        }
    }
}

function loadArrayBuffer(url:string, sucCallback:(bin: ArrayBuffer) => void, errCallback:() => void): void {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "arraybuffer";
    req.onreadystatechange = () => {
        if (req.readyState == 4) {
            if (req.status == 404) {
                errCallback();
            } else {
                sucCallback(req.response);
            }   
        }
    };
    req.onerror = (e:ErrorEvent) => {
        errCallback();
    };
    req.send();
}

let app = new zen.Application();
app.start();

let init = false;
document.onclick = function() {
    if(init) return;
    zen.Audio.active();

    loadArrayBuffer("sound.mp3", (buffer:ArrayBuffer) => {
        let audio = new zen.AudioAsset("sound.mp3");
        audio.buffer = buffer;
        zen.Audio.decodeAudioData(audio, () => {
            audio.buffer = buffer;
            audioSourceComponent.audio = audio;
            audioSourceComponent.use3D = true;
            audioSourceComponent.loop = true;
            audioSourceComponent.play();
        }, () => {});
    }, () => {});

    let audioListenerComponent = new zen.AudioListenerComponent();
    empty2.addComponent(audioListenerComponent);

    init = true;
}


let empty = new zen.GameObject(app);
// empty.enabled = false;

let empty2 = new zen.GameObject(app);
empty2.setPosition(2, 0, 0);

empty.addChild(empty2);

let object = new zen.GameObject(app);
object.name = "object";

let scriptComponent = new zen.ScriptComponent();
let speak = new Speak();
let walk = new Walk();
walk.speed = 10;
scriptComponent.addScript(speak);
scriptComponent.addScript(walk);
// scriptComponent.enabled = false;
object.addComponent(scriptComponent);

let audioSourceComponent = new zen.AudioSourceComponent();
object.addComponent(audioSourceComponent);

empty.addChild(object);
app.sceneManager.activeScene.addChild(empty);

// zen.waitForSeconds().then(function() {
//     console.log("11");
// });