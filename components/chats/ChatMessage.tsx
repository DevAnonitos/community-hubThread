import React from 'react';
import { Message } from 'ai';

import { cn } from '@/lib/utils';
import { MemoizedReactMarkdown } from '../customs';
import { IconOpenAI, IconUser } from '../ui/icons';

export interface ChatMessageProps {
    message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    return (
        <div>ChatMessage</div>
    );
};

export default ChatMessage;