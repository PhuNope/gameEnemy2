import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewComponent')
export class PlayerData extends Component {
    public static instance: PlayerData;

    public shipType: number;

    start() {
        if (PlayerData.instance == null) {
            PlayerData.instance = this;
            director.addPersistRootNode(this.node);
        }
    }

    update(deltaTime: number) {

    }
}


