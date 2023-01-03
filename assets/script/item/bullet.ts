import { _decorator, Component, Node, Vec3 } from 'cc';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('butlletController')
export class butlletController extends Component {
    private callback: CallableFunction;

    start () {

    }

    setUp (callback: CallableFunction) {
        this.callback = callback;
    }

    public hitObject () {
        this.callback();
    }

    update (deltaTime: number) {
        // let planePosition: Vec3 = this.node.parent.getWorldPosition();
        // let loc: Vec3 = new Vec3(this.node.position.x - planePosition.x, this.node.position.y - planePosition.y);

        if (this.node.position.y > Configs.HALF_SCENE_HEIGHT) {
            this.callback();
        } else {
            this.node.translate(new Vec3(0, 10, 0));
        }
    }
}


