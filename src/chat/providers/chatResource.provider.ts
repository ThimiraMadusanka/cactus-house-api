import { ChatResourceModel } from '../entities/chatResource.entity';
import { CHAT_RESOURCE } from 'src/constants/constants';

export const ChatResourceProvider = [
  {
    provide: CHAT_RESOURCE,
    useValue: ChatResourceModel,
  },
];
