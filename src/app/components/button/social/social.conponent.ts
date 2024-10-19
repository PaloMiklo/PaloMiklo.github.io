import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-social',
    template: `<button type="button" class="btn btn-circle" onclick="window.open('https://www.linkedin.com/in/pavol-mikla%C5%A1-2a0b6b174/', '_blank');"></button>`,
    styles: [`
        .btn-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0077B5;
        color: #fff;
        border: none;
        font-size: 20px;
        background-image: url('../../../../assets/linkedin.png');
        background-position: center;
        filter: brightness(70%);
        &:hover {
          filter: brightness(85%);
        }
    }`],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class SocialComponent { };

