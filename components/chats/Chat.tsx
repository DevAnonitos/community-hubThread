"use client";

import React, { useState } from 'react';
import { useChat, type Message } from "ai/react";

import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/lib/hooks';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogTitle, 
    DialogFooter, 
    DialogHeader, 
    DialogTrigger 
} from '../ui/dialog';

import { Toast } from '../ui/toast';

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview';
export interface ChatProps extends React.ComponentProps<'div'>{
    initialMessage?: Message[];
    id?: string;
};

const Chat = ({ 
    id, 
    initialMessage, 
    className 
}: ChatProps) => {
    return (
        <div>Chat</div>
    );
};

export default Chat;