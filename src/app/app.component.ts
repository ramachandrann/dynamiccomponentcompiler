import { Component, ViewChild, ViewContainerRef, Compiler, ComponentFactory, ComponentRef } from '@angular/core';
import { ComponentLoaderService } from './component-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  @ViewChild('mycomponentanchor', {read: ViewContainerRef}) myComponentAnchor: ViewContainerRef;

  constructor(private compiler: Compiler, private componentLoaderService: ComponentLoaderService) {}

  handleClick() {
    const compMetadata = new Component({
        selector: 'dynamic-html',
        template: `<input type='text'>`,
    });

    let cRef: ComponentRef<Component>;
    this.componentLoaderService.loadComponentWithMetadata(compMetadata).then((componentFactory :ComponentFactory<any>)=>{
    cRef = this.myComponentAnchor.createComponent(componentFactory);
      //cRef.instance.element = "BLAH";
    })
  }
}

