"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Speak = (function (_super) {
    __extends(Speak, _super);
    function Speak() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Speak.prototype.start = function (app) {
        console.log(app);
        console.log(this.gameObject);
        this.sayHi();
    };
    Speak.prototype.update = function (deltaTime) {
        // console.log(deltaTime);
    };
    Speak.prototype.sayHi = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 3];
                        return [4 /*yield*/, zen.waitForSeconds(1)];
                    case 1:
                        _a.sent();
                        // console.log("hi!");
                        return [4 /*yield*/, zen.waitForSeconds(1)];
                    case 2:
                        // console.log("hi!");
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Speak;
}(zen.Behaviour));
var Walk = (function (_super) {
    __extends(Walk, _super);
    function Walk() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 10;
        return _this;
    }
    Walk.prototype.start = function (app) {
        this.app = app;
    };
    Walk.prototype.update = function (deltaTime) {
        if (this.gameObject) {
            var p = this.gameObject.getPosition();
            var keyboard = this.app.inputManager.keyboard;
            if (keyboard.isPressed("a")) {
                var x = p.x - deltaTime * this.speed;
                this.gameObject.setPosition(x, p.y, p.z);
                // console.log(x);
            }
            if (keyboard.isPressed("d")) {
                var x = p.x + deltaTime * this.speed;
                this.gameObject.setPosition(x, p.y, p.z);
                // console.log(x);
            }
            if (keyboard.isPressed("w")) {
                console.log(1);
                var z = p.z + deltaTime * this.speed;
                this.gameObject.setPosition(p.x, p.y, z);
                // console.log(x);
            }
            if (keyboard.isPressed("s")) {
                var z = p.z - deltaTime * this.speed;
                this.gameObject.setPosition(p.x, p.y, z);
                // console.log(x);
            }
            // console.log(deltaTime);
            // this.gameObject.setPosition(Math.sin(this.count) * 10, 0, 0);
        }
        if (app.inputManager.wasPressed()) {
            console.log(app.inputManager.getTouchPoint().x);
        }
    };
    return Walk;
}(zen.Behaviour));
function loadArrayBuffer(url, sucCallback, errCallback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "arraybuffer";
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 404) {
                errCallback();
            }
            else {
                sucCallback(req.response);
            }
        }
    };
    req.onerror = function (e) {
        errCallback();
    };
    req.send();
}
var app = new zen.Application();
app.start();
app.assetManager.loadAssets([
    { url: "sounds/358232_j_s_song.mp3" },
    { url: "sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3" }
], function (progress) {
    console.log(progress.current + "/" + progress.total);
}, onLoad);
function onLoad() {
    console.log(app.assetManager.getAsset("def::cube"));
    var init = false;
    document.onclick = initSound;
    document.ontouchstart = initSound;
    document.onmousedown = initSound;
    function initSound() {
        if (init)
            return;
        zen.Audio.active();
        console.log(11);
        audioSourceComponent.play();
        audioSourceComponent2.play();
        // audioSourceComponent3.play();
        init = true;
    }
    var empty = new zen.GameObject(app);
    // empty.enabled = false;
    var object = new zen.GameObject(app);
    object.name = "object";
    var scriptComponent = new zen.ScriptComponent();
    var speak = new Speak();
    var walk = new Walk();
    walk.speed = 10;
    scriptComponent.addScript(speak);
    scriptComponent.addScript(walk);
    // scriptComponent.enabled = false;
    object.addComponent(scriptComponent);
    var audioListenerComponent = new zen.AudioListenerComponent();
    object.addComponent(audioListenerComponent);
    empty.addChild(object);
    var source1 = new zen.GameObject(app);
    source1.setPosition(10, 0, 5);
    console.log(source1.getPosition());
    empty.addChild(source1);
    var audioSourceComponent = new zen.AudioSourceComponent();
    var audio = app.assetManager.getAsset("sounds/358232_j_s_song.mp3");
    audioSourceComponent.audio = audio;
    audioSourceComponent.use3D = true;
    audioSourceComponent.loop = true;
    audioSourceComponent.volume = 0.5;
    source1.addComponent(audioSourceComponent);
    var source2 = new zen.GameObject(app);
    source2.setPosition(-10, 0, 5);
    console.log(source2.getPosition());
    empty.addChild(source2);
    var audioSourceComponent2 = new zen.AudioSourceComponent();
    var audio2 = app.assetManager.getAsset("sounds/376737_Skullbeatz___Bad_Cat_Maste.mp3");
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
