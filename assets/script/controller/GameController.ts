import { _decorator, Camera, Component, EventTouch, Input, input, Node, Vec3 } from 'cc';
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

        input.on(Input.EventType.TOUCH_MOVE, this.onSetPosition, this);

        console.log(this.camera.node.getWorldPosition());

    }

    private onSetPosition(event: EventTouch) {
        if (this.gameModel.playerPlaneNode == null) {
            return;
        } else {
            let touchLocation = event.getUILocation();
            let loc = new Vec3(touchLocation.x - Configs.HALF_SCENE_WIDTH, touchLocation.y - Configs.HALF_SCENE_HEIGHT + this.camera.node.getPosition().y, 0);

            //let finalPosition: Vec3 = this.camera.screenToWorld(loc);

            this.gameModel.playerPlaneNode.setPosition(loc);
        }
    }

    private clearEventTouch() {
        
    }

    update(deltaTime: number) {
        if (GameData.instance.gamePause) {
            return;
        }

        if (this.camera.node.getWorldPosition().y >= this.mapWorldPosition) {
            return;
        }

        GameData.instance.cameraWorldPosition = this.camera.node.getWorldPosition();
        if (this.gameModel.playerPlaneNode) {
            this.gameModel.playerPlaneNode.translate(new Vec3(0, 3, 0));

            this.camera.node.translate(new Vec3(0, 3, 0));
        }
    }
}