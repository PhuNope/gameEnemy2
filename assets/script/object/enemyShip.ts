import { _decorator, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, NodePool, Prefab, ProgressBar, Vec3 } from 'cc';
import { butlletController } from '../item/bullet';
import { ResourceUtils } from '../utils/ResourceUtils';
import { EnemyBullet } from '../item/EnemyBullet';
const { ccclass, property } = _decorator;

@ccclass('enemyShip')
export class enemyShip extends Component {
    @property(ProgressBar)
    healthBar: ProgressBar;

    private health: number = 5;
    private healthFull: number = 5;

    private bulletPrefab: Prefab;
    private bulletPool: NodePool;

    start () {
        let collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        this.createBullet();
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
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

    private createBullet () {
        ResourceUtils.loadPrefab("prefab/EnemyBullet", (prefab: Prefab) => {
            this.bulletPrefab = prefab;

            this.bulletPool = new NodePool();
            for (let i = 0; i < 20; i++) {
                let newBullet: Node = instantiate(prefab);
                newBullet.getComponent(EnemyBullet).setUp(() => {
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
                this.node.addChild(bullet);
                bullet.setWorldPosition(this.node.getWorldPosition());
            }
        }
    }

    private timeCount = 0;

    update (deltaTime: number) {
        this.timeCount += deltaTime;

        if (this.timeCount >= 0.5) {
            this.fire();
            this.timeCount = 0;
        }
    }
}


