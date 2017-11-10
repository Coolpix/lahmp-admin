import {Injectable} from '@angular/core';

@Injectable()
export class ScriptService {
  loadAPI: Promise<any>;

  public loadScripts(urlScript) {
    this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      const scriptNotExists = 0 === $('script[src*="' + urlScript + '"]').length;
      if (scriptNotExists) {
        this.loadScript(urlScript);
      }else{
        console.log('Script already exists.');
        this.removeScript(urlScript);
        this.loadScript(urlScript);
      }
    });
  }

  public loadScript(urlScript) {
    console.log('preparing to load...');
    const node = document.createElement('script');
    node.src = urlScript;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public removeScript(urlScript) {
    $('script[src*="' + urlScript + '"]').remove();
  }
}
