import { NgModule } from '@angular/core';
import { UserPipe } from './user/user';
import { ThumbnailPipe } from './thumbnail/thumbnail';
@NgModule({
	declarations: [UserPipe,
    ThumbnailPipe],
	imports: [],
	exports: [UserPipe,
    ThumbnailPipe]
})
export class PipesModule {}
