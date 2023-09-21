import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../services/post.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GroupingType } from '../models/grouping-type.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  formGroup = new FormGroup<{ groupBy: FormControl<GroupingType | null> }>({
    groupBy: new FormControl<GroupingType>(GroupingType.Time),
  });

  get groupBy() {
    return this.formGroup.get('groupBy');
  }

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.groupBy?.valueChanges.subscribe((groupBy) => {
      groupBy && this.postService.groupBy.set(groupBy);
    });
  }

  toggleDarkMode() {
    const body = globalThis.document.querySelector('body');

    if (body) {
      const isDarkMode = body?.className === 'darkmode';

      isDarkMode ? (body.className = '') : (body.className = 'darkmode');
    }
  }
}
