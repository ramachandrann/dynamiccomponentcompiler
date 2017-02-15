import {
  Injectable, Compiler, ModuleWithComponentFactories,
  ComponentFactory, NgModuleFactory, Component, NgModule
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Injectable()
export class ComponentLoaderService {

  constructor(private compiler: Compiler) { }

  loadComponentWithMetadata(metadata: Component) {        
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);

    @NgModule({ imports: [CommonModule], declarations: [decoratedCmp] })
    class DynamicHtmlModule { }

    return new Promise((resolve, reject) => {
      this.compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule).then(
          (moduleWithComponentFactories: ModuleWithComponentFactories<any>) => {
            const componentFactories: ComponentFactory<any>[] = moduleWithComponentFactories.componentFactories;
            const ngModuleFactory: NgModuleFactory<any> = moduleWithComponentFactories.ngModuleFactory;
            // /selector
            const ComponentFactory: ComponentFactory<any> = componentFactories.find((componentFactory: ComponentFactory<any>) => {
              return componentFactory.selector === metadata.selector;
            });
            resolve(ComponentFactory);

          }
          , () => {
            reject(null);
          });
    });
  }

}