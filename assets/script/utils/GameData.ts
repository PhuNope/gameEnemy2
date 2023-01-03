import { _decorator, Component, director, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData extends Component {
    public static instance: GameData;

    public cameraWorldPosition: Vec3;

    start () {
        if (!GameData.instance) {
            GameData.instance = this;
            director.addPersistRootNode(this.node);
        }
    }

    update (deltaTime: number) {

    }
}


