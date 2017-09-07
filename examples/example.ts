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
            // console.log("hi!");
            await zen.waitForSeconds(1);
            // console.log("ha!");
        }
    }
}

class Walk extends zen.Behaviour {

    public speed:number = 10;

    private app:zen.Application;

    public start(app:zen.Application) {
        this.app = app;
    }

    public update(deltaTime:number) {

        if(this.gameObject) {
            let p = this.gameObject.getPosition();
            let keyboard = this.app.inputManager.keyboard;
            if(keyboard.isPressed("a")) {
                let x = p.x - deltaTime * this.speed;
                this.gameObject.setPosition(x, p.y, p.z);
                // console.log(x);
            }
            if(keyboard.isPressed("d")) {
                let x = p.x + deltaTime * this.speed;
                this.gameObject.setPosition(x, p.y, p.z);
                // console.log(x);
            }
            if(keyboard.isPressed("w")) {
                console.log(1)
                let z = p.z + deltaTime * this.speed;
                this.gameObject.setPosition(p.x, p.y, z);
                // console.log(x);
            }
            if(keyboard.isPressed("s")) {
                let z = p.z - deltaTime * this.speed;
                this.gameObject.setPosition(p.x, p.y, z);
                // console.log(x);
            }
            // console.log(deltaTime);
            
            // this.gameObject.setPosition(Math.sin(this.count) * 10, 0, 0);
        }

        if(app.inputManager.wasPressed()) {
            console.log(app.inputManager.getTouchPoint().x);
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

app.assetManager.loadAssets([
    {url: "sounds/358232_j_s_song.mp3"},
    {url: "sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3"}
], (progress) => {
    console.log(progress.current + "/" + progress.total);
}, onLoad);

function onLoad() {

    console.log(app.assetManager.getAsset("def::cube"))

    let init = false;
    document.onclick = initSound;
    document.ontouchstart = initSound;
    document.onmousedown = initSound;
    function initSound() {
        if(init) return;
        zen.Audio.active();console.log(11)

        audioSourceComponent.play();
        audioSourceComponent2.play();
        // audioSourceComponent3.play();

        init = true;
    }


    let empty = new zen.GameObject(app);
    // empty.enabled = false;

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
    let audioListenerComponent = new zen.AudioListenerComponent();
    object.addComponent(audioListenerComponent);
    empty.addChild(object);

    let source1 = new zen.GameObject(app);
    source1.setPosition(10, 0, 5);
    console.log(source1.getPosition());
    empty.addChild(source1);
    let audioSourceComponent = new zen.AudioSourceComponent();
    let audio = app.assetManager.getAsset<zen.AudioAsset>("sounds/358232_j_s_song.mp3");
    audioSourceComponent.audio = audio;
    audioSourceComponent.use3D = true;
    audioSourceComponent.loop = true;
    audioSourceComponent.volume = 0.5;
    source1.addComponent(audioSourceComponent);

    let source2 = new zen.GameObject(app);
    source2.setPosition(-10, 0, 5);
    console.log(source2.getPosition());
    empty.addChild(source2);
    let audioSourceComponent2 = new zen.AudioSourceComponent();
    let audio2 = app.assetManager.getAsset<zen.AudioAsset>("sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3");
    audioSourceComponent2.audio = audio2;
    audioSourceComponent2.use3D = true;
    audioSourceComponent2.loop = true;
    audioSourceComponent2.volume = 0.5;
    source2.addComponent(audioSourceComponent2);

    // let source3 = new zen.GameObject(app);
    // source3.setPosition(0, 0, 10);
    // empty.addChild(source3);
    // let audioSourceComponent3 = new zen.AudioSourceComponent();
    // let audio3 = app.assetManager.getAsset<zen.AudioAsset>("sounds/Project_Utopia.ogg");
    // audioSourceComponent3.audio = audio3;
    // audioSourceComponent3.use3D = true;
    // audioSourceComponent3.loop = true;
    // audioSourceComponent3.volume = 0.5;
    // source3.addComponent(audioSourceComponent3);

    app.sceneManager.activeScene.addChild(empty);

    // zen.waitForSeconds().then(function() {
    //     console.log("11");
    // });
}