import { ContactModel } from '../entities/contact.entity';
import { CONTACT } from 'src/constants/constants';

export const ContactProvider = [
  {
    provide: CONTACT,
    useValue: ContactModel,
  },
];
