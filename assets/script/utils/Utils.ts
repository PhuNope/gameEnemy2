import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Utils')
export class Utils {
    public static Log(obj,str2=null,str3=null){
        console.log(obj,str2,str3);
    }
}


