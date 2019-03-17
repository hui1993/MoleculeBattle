import {GameUtils} from './game-utils';
import * as BABYLON from 'babylonjs';
import * as GUI from "babylonjs-gui";
import { IfObservable } from 'rxjs/observable/IfObservable';
import { automicManager } from './AutomicManager';

export class Game {

    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light: BABYLON.Light;
    private _sharkMesh: BABYLON.AbstractMesh;
    private _sharkAnimationTime = 0;
    private _swim: boolean = false;

    constructor(canvasElement: string) {
        // Create canvas and engine
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    /**
     * Creates the BABYLONJS Scene
     */
    createScene(): void {
        // create a basic BJS Scene object
        this._scene = new BABYLON.Scene(this._engine);
        // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
        this._camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 4, 30, BABYLON.Vector3.Zero(), this._scene);
        this._camera.attachControl(this._canvas, true);
        // create a basic light, aiming 0,1,0 - meaning, to the sky
        this._light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);
        // create the skybox
        let skybox = GameUtils.createSkybox("skybox", "./assets/texture/skybox/TropicalSunnyDay", this._scene);
        // finally the new u

        GameUtils.createGui("Create Automic with A positive charge",12,12,
            (btn) => {
                automicManager.getIns().createAutomic(1,true,this._scene);
            });

        GameUtils.createGui("Create Automic with A negative charge",400,12,
            (btn) => {
                automicManager.getIns().createAutomic(1,false,this._scene);
            });

            automicManager.getIns().createAutomic(2,true,this._scene);
            automicManager.getIns().createAutomic(1,false,this._scene);
            automicManager.getIns().createAutomic(1,false,this._scene);
    }
    /**
     * Starts the animation loop.
     */
    public animate(): void {
        this._scene.registerBeforeRender(() => {
            automicManager.getIns().update()
        });

        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
    

}