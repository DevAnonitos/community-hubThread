import React from 'react';
import { type Message } from "ai";

import { Separator } from '../ui/separator';
import ChatMessage from './ChatMessage';

export interface ChatListProps {
    messages: Message[];
}

const ChatList = ({ messages }: ChatListProps) => {
    return (
        <div>ChatList</div>
    );
};

export default ChatList;