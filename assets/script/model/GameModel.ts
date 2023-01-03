import { _decorator, Camera, Component, instantiate, log, Node, Prefab } from 'cc';
import { ResourceUtils } from '../utils/ResourceUtils';
import { playerPlane } from '../object/playerPlane';
import { PlayerData } from '../utils/PlayerData';
const { ccclass, property }=_decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property(Node)
    gamePlay: Node;

    @property(Node)
    displayPlane: Node;

    playerPlaneNode: Node;

    start () {

    }

    public loadPlayerPlane () {
        ResourceUtils.loadPrefab("prefab/PlayerPlane", (playerPlanerPrefab: Prefab) => {
            this.playerPlaneNode=instantiate(playerPlanerPrefab);
            this.displayPlane.addChild(this.playerPlaneNode);

            this.playerPlaneNode.getComponent(playerPlane).setPlaneType(PlayerData.instance.shipType);
        });
    }

    update (deltaTime: number) {

    }
}


