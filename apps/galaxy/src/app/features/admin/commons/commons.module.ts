import { NgModule } from '@angular/core';
import { UiModule } from './ui/ui.module';
import { ComponentsModule } from './components/components.module';
import { HttpModule } from './http/http.module';
import { GlxWorkshopsHttpModule } from '@galaxy/commons/http/workshop';
import { GlxErrorsInterceptorModule } from '@galaxy/commons/interceptors';
import { GlxInstructorsHttpModule } from '@galaxy/commons/http/instructor';

@NgModule({
  exports: [
    UiModule,
    ComponentsModule,
    HttpModule,

    GlxWorkshopsHttpModule,
    GlxInstructorsHttpModule,
    GlxErrorsInterceptorModule
  ],
})
export class AdminCommonsModule { }
