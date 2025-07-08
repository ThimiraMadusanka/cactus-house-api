import { ConversationModel } from '../entities/conversation.entity';
import { CONVERSATION } from 'src/constants/constants';

export const ConverstionProvider = [
  {
    provide: CONVERSATION,
    useValue: ConversationModel,
  },
];
