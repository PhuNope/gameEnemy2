import { _decorator, Component, director, Node, ProgressBar } from 'cc';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('LoadController')
export class LoadController extends Component {
    @property(ProgressBar)
    loadingProgressBar: ProgressBar;

    start() {
        director.preloadScene(Configs.MENU_SCENE_NAME, (complete, total) => {
            this.onLoading(complete, total);
        }, () => {
            director.loadScene(Configs.MENU_SCENE_NAME);
        });

    }

    onLoading(complete, total) {
        let percent = complete / total;
        this.loadingProgressBar.progress = percent;
    }
}


