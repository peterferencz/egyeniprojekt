import { Component, ElementRef, ViewChild } from '@angular/core';
import {CruzrSdk} from '../../../cruzrsdk';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  @ViewChild('video', {read: ElementRef}) video: ElementRef;
  playing = false;
  cancelevent = new Event('cancel');

  constructor(private elementRef: ElementRef) {
    CruzrSdk.init();
  }

  click() {
    if(this.playing){
      window.dispatchEvent(this.cancelevent);
      this.video.nativeElement.pause();
      this.video.nativeElement.currentTime = 0;
    }else{
      CruzrSdk.ledSetOnOff({onOff: true});
      CruzrSdk.ledSetColor({r: 255, g: 0, b: 0, times: 1});
      this.video.nativeElement.play();
      this.dance();
    }
    this.playing = !this.playing;
  }

  async dance() {
    window.addEventListener('cancel', () => { throw new Error('Cancelled'); });
    setTimeout(async () => {
      CruzrSdk.ledSetOnOff({onOff: true});
      CruzrSdk.ledSetColor({r: 255, g: 0, b: 0, times: 1});
      await this.sleep(1);
      CruzrSdk.ledSetColor({r: 0, g: 255, b: 0, times: 1});
      await this.sleep(1);
      CruzrSdk.ledSetColor({r: 0, g: 0, b: 255, times: 1});
      await this.sleep(1);
      CruzrSdk.ledSetColor({r: 255, g: 255, b: 255, times: 1});
      await this.sleep(1);
      CruzrSdk.ledSetOnOff({onOff: false});
    }, 0);

    await this.sleep(17);
    CruzrSdk.run({action: Pose.guideright});
    await this.sleep(7);
    CruzrSdk.run({action: Pose.pose3});
    await this.sleep(2);
    CruzrSdk.run({action: Pose.talk1});
    await this.sleep(2);
    CruzrSdk.run({action: Pose.talk2});
    await this.sleep(5);
    CruzrSdk.run({action: Pose.zhilu});
    await this.sleep(5);

    //refrén
    await this.refr();


    CruzrSdk.run({action: 'pose1'});

    //End: 3*60 + 17
    // eslint-disable-next-line @typescript-eslint/dot-notation
    navigator['app'].exitApp();
  };

  refr = async () => {
    CruzrSdk.ledSetOnOff({onOff: true});
    CruzrSdk.run({action: Pose.hug});
    await this.sleep(7);
    CruzrSdk.ledSetColor({r: 255, g: 255, b: 255, times: 1});
    CruzrSdk.run({action: Pose.pose1}); //TODO salute
    await this.sleep(5);
    await this.sleep(5);
    CruzrSdk.run({action: Pose.guideleft});
    await this.sleep(4);
    CruzrSdk.run({action: Pose.commandover});
    await this.sleep(4);
    CruzrSdk.ledSetOnOff({onOff: false});
  };
  sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms * 1000));
}



enum Pose {
  pose1 = 'pose1', pose2 = 'pose2', pose3 = 'pose3', hug = 'hug', shankhand = 'shankhand',
  goodbye = 'goodbye', talk1 = 'talk1', talk2 = 'talk2', talk3 = 'talk3', talk4 = 'talk4',
  talk5 = 'talk5', talk6 = 'talk6', talk7 = 'talk7', talk8 = 'talk8', nod = 'nod', applause = 'applause',
  zhuatou = 'zhuatou', guideleft = 'guideleft', guideright = 'guideright', cute = 'cute', fendou = 'fendou',
  zhanggao = 'zhanggao', swingarm = 'swingarm', searching = 'searching', fadai = 'fadai', tiaowang = 'tiaowang',
  longzhuashou = 'longzhuashou', baohu = 'baohu', surprise = 'surprise', zhilu = 'zhilu', shy = 'shy',
  command = 'command', commandover = 'commandover', walk = 'walk', reset = 'reset'
}
