"use client";

import React, { useEffect, useRef } from 'react';

import { UseChatHelpers } from 'ai/react';
import { useRouter } from 'next/navigation';
import { useEnterSubmit } from '@/lib/hooks';
import { cn } from '@/lib/utils';

import Textarea from 'react-textarea-autosize'
import { Button, buttonVariants } from '../ui/button';
import { IconArrowElbow, IconPlus } from '../ui/icons';
import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger, 
} from '../ui/tooltip';

export interface PromptProps
    extends Pick<UseChatHelpers, 'input' | 'setInput'> {
        onSubmit: (value: string) => Promise<void>;
        isLoading: boolean;
    };

const PromptForm = ({ 
    onSubmit,
    input,
    setInput,
    isLoading,
}: PromptProps) => {

    const router = useRouter();
    const { formRef, onKeyDown } = useEnterSubmit();
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    }, []); 

    return (
        <>
            <form
                onSubmit={async e=> {
                    e.preventDefault();
                    if(!input?.trim()){
                        return;
                    }
                    setInput('');
                    await onSubmit(input);
                }}
                ref={formRef}
            >
                <div 
                    className='relative flex max-h-60 w-full 
                    grow flex-col overflow-hidden px-8 
                    sm:rounded-md sm:border-[1px] sm:px-12'
                >

                </div>
            </form>
        </>
    );
};

export default PromptForm;