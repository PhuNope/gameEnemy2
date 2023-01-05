import {
    _decorator,
    Camera,
    Collider2D,
    Component,
    Contact2DType,
    dragonBones,
    EventTouch,
    Input,
    input,
    instantiate,
    IPhysics2DContact,
    Node,
    NodePool,
    Prefab,
    Vec3,
} from "cc";
import { Configs } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
import { butlletController } from "../item/bullet";
import { GameData } from "../utils/GameData";
const { ccclass, property } = _decorator;

@ccclass("playerPlane")
export class playerPlane extends Component {
    @property(Node)
    planeBody: Node;

    private bulletPrefab: Prefab;

    private planeType: number;

    private bulletPool: NodePool;

    private bulletDisplay: Node;

    onLoad() {
        this.node.active = false;
    }

    start() {
        this.bulletDisplay = this.node.getParent().getChildByName("bulletDisplay");

        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    public setPlaneType(planeType: number) {
        this.planeType = planeType - 1;

        let armatureDisplay = this.planeBody.getComponent(
            dragonBones.ArmatureDisplay
        );
        let armature = armatureDisplay!.armature();
        let slots = armature.getSlots();

        slots[0].displayIndex = this.planeType;
        this.node.active = true;
        //this.setUpInput();

        this.createBullet();
    }

    // private setUpInput() {
    //     //input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    // }

    // private onTouchMove(event: EventTouch) {
    //     //ham get touch location
    //     let touchLocation = event.getUILocation();
    //     let loc = new Vec3(touchLocation.x, touchLocation.y + 1280, 0);

    //     let position = this.node.parent.parent.getChildByName("Camera").getComponent(Camera).screenToWorld(loc);

    //     this.node.setWorldPosition(position);
    // }

    updatePosition(position: Vec3) {
        this.node.setWorldPosition(position);
    }

    private createBullet() {
        ResourceUtils.loadPrefab("prefab/PlayerBullet", (prefab: Prefab) => {
            this.bulletPrefab = prefab;

            this.bulletPool = new NodePool();
            for (let i = 0; i < 20; i++) {
                let newBullet: Node = instantiate(prefab);
                newBullet.getComponent(butlletController).setUp(() => {
                    if (!this.node) {
                        newBullet.destroy();
                    } else {
                        this.bulletPool.put(newBullet);
                    }
                });

                this.bulletPool.put(newBullet);
            }
        });
    }

    private fire() {
        if (this.bulletPrefab) {
            let bullet: Node = this.bulletPool.get();

            if (bullet) {
                this.bulletDisplay.addChild(bullet);
                bullet.setWorldPosition(this.node.getWorldPosition());

                //bullet.setParent(this.bulletDisplay.getParent().getParent(), true);
            }
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.node) {
            let hitObject: Node = otherCollider.node;
            if (hitObject.name.includes("EnemyBullet") || hitObject.name.includes("BossBullet")) {
                GameData.instance.gamePause = true;

                // this.node.destroy();
            }
        }
    }

    private timeCount = 0;

    update(deltaTime: number) {
        if (GameData.instance.gamePause) {
            return;
        }

        this.timeCount += deltaTime;

        if (this.timeCount >= 0.2) {
            this.fire();
            this.timeCount = 0;
        }

        //this.node.translate(new Vec3(0, 3, 0));
    }
}
