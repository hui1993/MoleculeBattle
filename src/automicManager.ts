import { Automic } from "./Automic";

export class automicManager{

    public static _instance:automicManager;
    public static getIns(){
        if(!this._instance){
            this._instance = new automicManager;
        }
        return this._instance;
    }

    private _automicList:Array<Automic>;
    public constructor(){
        this._automicList = [];
    }

    public update(){
        //做碰撞检测之前，先讲电荷清空
        this._automicList.forEach((automic)=>{automic.clearElectron()});
        //检测碰撞，计算电荷数
        for (let k = 0; k < this._automicList.length; k++) {
            let automicA = this._automicList[k];
            let automicAsphere = automicA.Sphere;
            for(let j=k+1;j< this._automicList.length; j++){
                let automicB = this._automicList[j];
                let automicBsphere = automicB.Sphere;
                let distance = BABYLON.Vector3.Distance(automicAsphere.position,automicBsphere.position);
                if(distance <= 3 && automicA.pole != automicB.pole){
                    automicA.electron ++;
                    automicB.electron ++;
                }
                //原子相交，会产生排斥力
                if(distance <= 2){
                    let vector3 = automicAsphere.position.subtract(automicBsphere.position).scaleInPlace(0.1);
                    if(vector3.equals(BABYLON.Vector3.Zero())) vector3 = new BABYLON.Vector3(0.1,0.1,0.1);
                    automicAsphere.position.addInPlace(vector3);
                    automicBsphere.position.subtractInPlace(vector3);
                    // let vector3 = automicAsphere.position.subtract(automicBsphere.position).scaleInPlace(0.01);
                    // if(automicA.pole == automicB.pole){
                    //     automicAsphere.position.addInPlace(vector3);
                    //     automicBsphere.position.subtractInPlace(vector3);
                    // }
                }
                //在一定距离内，同性相斥，异性相吸
                else if(distance > 3 && distance <= 6){
                    let vector3 = automicAsphere.position.subtract(automicBsphere.position).scaleInPlace(0.01);
                    if(automicA.pole == automicB.pole){
                        // automicAsphere.position.addInPlace(vector3);
                        // automicBsphere.position.subtractInPlace(vector3);
                    }
                    else {
                        automicAsphere.position.subtractInPlace(vector3);
                        automicBsphere.position.addInPlace(vector3);
                    }
                }
            }
        }
        //根据电荷数量进行处理
        let banlance:boolean = true;
        this._automicList.forEach((automic)=>{
            // let material = automic.Sphere.material as BABYLON.StandardMaterial;
            // material.emissiveColor = automic.stable?BABYLON.Color3.Red():BABYLON.Color3.White();
            if(!automic.stable) banlance = false;
        })
        if(banlance){
            // console.error("successful");
        }
    }

    public createAutomic(electron:number,positive:boolean,scene:BABYLON.Scene){
        let automic = new Automic("automic",scene);
        automic.setPole(electron,positive);
        automic.Sphere.position = new BABYLON.Vector3(Math.random()*4 - 2,Math.random()*4 - 2,Math.random()*4 - 2);
        this._automicList.push(automic);
    }
}