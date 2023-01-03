import { _decorator, Component, Node, Vec3 } from 'cc';
import { Configs } from '../utils/Configs';
import { GameData } from '../utils/GameData';
const { ccclass, property } = _decorator;

@ccclass('EnemyBullet')
export class EnemyBullet extends Component {
    private callback: CallableFunction;

    start() {

    }

    setUp(callback: CallableFunction,) {
        this.callback = callback;
    }

    update(deltaTime: number) {
        let cameraWorldPosition = GameData.instance.cameraWorldPosition;

        // if (this.node.getWorldPosition().y < cameraWorldPosition.y - Configs.HALF_SCENE_HEIGHT) {
        //     this.callback();
        // } else {
        //     this.node.translate(new Vec3(0, -5, 0));
        // }

        if (this.node.position.y < -Configs.HALF_SCENE_HEIGHT) {
            this.callback();
        } else {
            this.node.translate(new Vec3(0, -3, 0));
        }
    }
}


