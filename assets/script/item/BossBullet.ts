import { _decorator, Component, Node, Vec3 } from 'cc';
import { GameData } from '../utils/GameData';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('BossBullet')
export class BossBullet extends Component {
    private callback: CallableFunction;

    start() {

    }

    setUp(callback: CallableFunction) {
        this.callback = callback;
    }

    update(deltaTime: number) {
        if (GameData.instance.gamePause) {
            return;
        }

        let cameraWorldPosition = GameData.instance.cameraWorldPosition;

        if (this.node.getWorldPosition().y <= cameraWorldPosition.y - Configs.HALF_SCENE_HEIGHT) {
            this.callback();
        } else {
            this.node.translate(new Vec3(0, -3, 0));
        }
    }
}


