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
    
    }

    public update(deltaTime:number) {
        this.count += deltaTime;
        if(this.count >= 1) {
            console.log("move:" + this.count + ", speed: " + this.speed);
            this.count = 0;
        }
    }
}

let app = new zen.Application();
app.start();

let object = new zen.GameObject(app);
object.name = "object";

let scriptComponent = new zen.ScriptComponent();
let speak = new Speak();
let walk = new Walk();
walk.speed = 10;
scriptComponent.addScript(speak);
scriptComponent.addScript(walk);
object.addComponent(scriptComponent);

app.sceneManager.activeScene.addChild(object);

// zen.waitForSeconds().then(function() {
//     console.log("11");
// });