import { _decorator, Camera, Component, Node, Vec3 } from 'cc';
import { GameModel } from '../model/GameModel';
import { GameData } from '../utils/GameData';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    gameModelNode: Node;

    @property(Camera)
    camera: Camera;
    gameModel: GameModel;

    start () {
        this.gameModel = this.gameModelNode.getComponent(GameModel);
        this.gameModel.loadPlayerPlane();
    }

    update (deltaTime: number) {
        this.camera.node.translate(new Vec3(0, 3, 0));
        GameData.instance.cameraWorldPosition = this.camera.node.getWorldPosition();
    }
}


