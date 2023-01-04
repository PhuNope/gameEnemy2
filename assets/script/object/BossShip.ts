import { _decorator, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, NodePool, Prefab, ProgressBar, Vec3 } from 'cc';
import { butlletController } from '../item/bullet';
import { ResourceUtils } from '../utils/ResourceUtils';
import { BossBullet } from '../item/BossBullet';
import { GameData } from '../utils/GameData';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('BossShip')
export class BossShip extends Component {
    @property(ProgressBar)
    healthBar: ProgressBar;

    private health: number = 20;
    private healthFull: number = 20;

    private bulletPrefab: Prefab;
    private bulletPool: NodePool;

    start() {
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        this.createBullet();

        this.destroyPosition = this.node.getWorldPosition();
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.node) {
            let hitObject: Node = otherCollider.node;
            if (hitObject.name.includes("PlayerBullet")) {
                this.health -= 1;
                this.healthBar.progress = this.health / this.healthFull;

                otherCollider.node.getComponent(butlletController).hitObject();

                if (this.health <= 0) {
                    this.node.destroy();
                }
            }
        }
    }

    private createBullet() {
        ResourceUtils.loadPrefab("prefab/BossBullet", (prefab: Prefab) => {
            this.bulletPrefab = prefab;

            this.bulletPool = new NodePool();
            for (let i = 0; i < 20; i++) {
                let newBullet: Node = instantiate(prefab);
                this.bulletPool.put(newBullet);

                newBullet.getComponent(BossBullet).setUp(() => {
                    if (!this.node) {
                        newBullet.destroy();
                    } else {
                        this.bulletPool.put(newBullet);
                    }
                });
            }
        });
    }

    private fire() {
        if (this.bulletPrefab) {
            let bullet: Node = this.bulletPool.get();

            if (bullet) {
                //this.node.addChild(bullet);
                //this.node.getChildByName("bulletDisplay").addChild(bullet);
                //bullet.setWorldPosition(this.node.getWorldPosition());
                //bullet.position = this.node.getPosition();
                this.node.getChildByName("bulletDisplay").addChild(bullet);
                bullet.setPosition(new Vec3(0, 0, 0));

                bullet.setParent(this.node.getParent(), true);
            }
        }
    }

    private timeCount: number = 0;
    private destroyPosition: Vec3;

    update(deltaTime: number) {
        if (GameData.instance.gamePause) {
            return;
        }

        this.timeCount += deltaTime;

        if (this.timeCount >= 0.5 && this.node.getWorldPosition().y <= GameData.instance.cameraWorldPosition.y + Configs.HALF_SCENE_HEIGHT) {
            this.fire();
            this.timeCount = 0;
        }

        // if (this.node.getWorldPosition().y < this.destroyPosition.y - 1280) {
        //     this.node.destroy();
        // }
    }
}


