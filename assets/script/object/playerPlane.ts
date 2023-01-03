import {
    _decorator,
    Component,
    dragonBones,
    EventTouch,
    Input,
    input,
    instantiate,
    Node,
    NodePool,
    Prefab,
    Vec3,
} from "cc";
import { Configs } from "../utils/Configs";
import { ResourceUtils } from '../utils/ResourceUtils';
import { butlletController } from "../item/bullet";
const { ccclass, property } = _decorator;

@ccclass("playerPlane")
export class playerPlane extends Component {
    @property(Node)
    planeBody: Node;

    private bulletPrefab: Prefab;

    private planeType: number;

    private bulletPool: NodePool;

    private bulletDisplay: Node;

    onLoad () {
        this.node.active = false;
    }

    start () {
        this.bulletDisplay = this.node.getParent().getChildByName("bulletDisplay");
    }

    public setPlaneType (planeType: number) {
        this.planeType = planeType - 1;

        let armatureDisplay = this.planeBody.getComponent(
            dragonBones.ArmatureDisplay
        );
        let armature = armatureDisplay!.armature();
        let slots = armature.getSlots();

        slots[0].displayIndex = this.planeType;
        this.node.active = true;
        this.setUpInput();

        this.createBullet();
    }

    private setUpInput () {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    private onTouchMove (event: EventTouch) {
        let touchLocation = event.getUILocation();

        let loc = new Vec3(
            touchLocation.x - Configs.HALF_SCENE_WIDTH,
            touchLocation.y - Configs.HALF_SCENE_HEIGHT
        );

        this.node.setPosition(loc);
    }

    private createBullet () {
        ResourceUtils.loadPrefab("prefab/PlayerBullet", (prefab: Prefab) => {
            this.bulletPrefab = prefab;

            this.bulletPool = new NodePool();
            for (let i = 0; i < 20; i++) {
                let newBullet: Node = instantiate(prefab);
                newBullet.getComponent(butlletController).setUp(() => {
                    this.bulletPool.put(newBullet);
                });

                this.bulletPool.put(newBullet);
            }
        });
    }

    private fire () {
        if (this.bulletPrefab) {
            let bullet: Node = this.bulletPool.get();

            if (bullet) {
                this.bulletDisplay.addChild(bullet);
                bullet.setWorldPosition(this.node.getWorldPosition());
            }
        }
    }

    private timeCount = 0;

    update (deltaTime: number) {
        this.timeCount += deltaTime;

        if (this.timeCount >= 0.2) {
            this.fire();
            this.timeCount = 0;
        }
    }
}
