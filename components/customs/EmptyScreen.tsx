import React from 'react';
import { UseChatHelpers } from 'ai/react';

import { Button } from '../ui/button';
import ExternalLink from './ExternalLink';
import { IconArrowRight } from '../ui/icons';
import { exampleMessages } from '@/constants';

const EmptyScreen = ({ setInput }: Pick<UseChatHelpers, 'setInput'>) => {
    return (
        <div className='mx-auto max-w-2xl px-4'>
            <div className='rounded-lg border-[1px] border-gray-700 p-8'>
                <h1 className='mb-2 text-lg fond-font-semibold'>
                    Welcome to AI-ver Chatbot!
                </h1>

                <p className='leading-normal text-muted-foreground'>
                    You can start a conversation here or try the following examples:
                </p>

                <div className='mt-4 flex flex-col items-start space-y-2'>
                    {exampleMessages.map((message, index) => (
                        <Button
                            key={index}
                            variant="link"
                            className='h-auto p-0 text-base-regular'
                            onClick={() => setInput(message.message)}
                        >
                            <IconArrowRight className="mr-2 text-muted-foreground" />
                            {message.heading}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmptyScreen;