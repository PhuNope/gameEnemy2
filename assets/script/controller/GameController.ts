import { _decorator, Camera, Component, Node, Vec3 } from 'cc';
import { GameModel } from '../model/GameModel';
import { GameData } from '../utils/GameData';
import { Configs } from '../utils/Configs';
import { playerPlane } from '../object/playerPlane';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    gameModelNode: Node;

    @property(Camera)
    camera: Camera;
    gameModel: GameModel;

    @property(Node)
    mapNode: Node;

    mapWorldPosition: number;

    start() {
        this.gameModel = this.gameModelNode.getComponent(GameModel);
        this.gameModel.loadPlayerPlane();

        this.mapWorldPosition = this.mapNode.getChildByPath("block/river-bg-002").getWorldPosition().y;
    }

    update(deltaTime: number) {
        if (GameData.instance.gamePause) {
            return;
        }

        if (this.camera.node.getWorldPosition().y >= this.mapWorldPosition) {
            return;
        }

        this.camera.node.translate(new Vec3(0, 3, 0));
        GameData.instance.cameraWorldPosition = this.camera.node.getWorldPosition();
        if (this.gameModel.playerPlaneNode)
            this.gameModel.playerPlaneNode.translate(new Vec3(0, 3, 0));
    }
}


