import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message: Message;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.message = this.data.getMessageById(parseInt(id, 10));
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

  getLogoSrc(merchant: string): string {
    if(merchant.toLowerCase().includes('coop')){
      return 'https://www.coop.ch/_ui/21.2.2.1069/desktop/common/img/masthead/logo/img/coop_logo.svg';
    } else if (merchant.toLowerCase().includes('migros')){
      return 'https://www.migros.ch/dam/jcr:784c2e31-9dd8-42ec-8142-e75d1abb22d9/migrosx.svg';
    } else if (merchant.toLowerCase().includes('denner')){
      return 'https://www.denner.ch/typo3conf/ext/template_local/Resources/Public/Images/Denner-Logo.gif';
    } else if (merchant.toLowerCase().includes('lidl')){
      return 'https://www.lidl.ch/bundles/cakecomponents/dist/images/brand__ch.svg';
    } else {
      return 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
    }
  }
}
