import Block from '../../tools/Block';
import './profile-settings.css';

import ProfileSettingsRaw from './profile-settings.hbs?raw';

interface Props {
  [key: string]: unknown;
 }
export class ProfileSettings extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => console.log('event'),
      },
    });
  }

  render() {
    return ProfileSettingsRaw;
  }
}
