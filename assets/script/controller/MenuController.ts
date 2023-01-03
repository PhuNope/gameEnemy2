import { _decorator, Component, director, Node } from 'cc';
import { PlayerData } from '../utils/PlayerData';
import { Configs } from '../utils/Configs';
const { ccclass, property }=_decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    @property(Node)
    selectPlaneUINode: Node;

    start () {

    }

    onClickPlay () {
        this.selectPlaneUINode.active=true;
    }

    onSelectShip (event, args) {
        PlayerData.instance.shipType=args;
        director.loadScene(Configs.GAME_SCENE_NAME);
    }
}


