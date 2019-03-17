import * as BABYLON from 'babylonjs';

export class Automic {

    private _pole:boolean;
    private _electron:number;
    private _baseElectron:number;
    private _sphere:BABYLON.Mesh;
    public constructor(name:string,scene:BABYLON.Scene){
        this.createSphere(scene);
    }

    private createSphere(scene:BABYLON.Scene){
        var sphere = BABYLON.Mesh.CreateSphere("Sphere", 32, 3, scene)
        sphere.position = new BABYLON.Vector3(0,0,0);

        let material = new BABYLON.StandardMaterial("kosh4", scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        material.emissiveColor = BABYLON.Color3.White();
        material.specularPower = 64;
        // material.diffuseTexture = new BABYLON.Texture("assets/texture/automic/automic_C.jpg", scene)
        sphere.material = material;

        var pointerDragBehavior = new BABYLON.PointerDragBehavior();
        pointerDragBehavior.useObjectOrienationForDragging = false;

        sphere.addBehavior(pointerDragBehavior);

        this._sphere = sphere;

        return sphere;
    }

    public setPole(electronnum:number,isPole:boolean){
        this._baseElectron = electronnum;
        this.clearElectron();
        this._pole = isPole;

        let material = this.Sphere.material as BABYLON.StandardMaterial;
        material.emissiveColor = isPole?BABYLON.Color3.White():BABYLON.Color3.Black();
    }

    public clearElectron(){
        this._electron = 0;
    }

    public set electron(value:number){
        this._electron = value;
    }

    public get electron():number{
        return this._electron;
    }

    public get Sphere(){
        return this._sphere;
    }

    public get pole(){
        return this._pole;
    }

    public get stable(){
        return this._electron == this._baseElectron;
    }
}