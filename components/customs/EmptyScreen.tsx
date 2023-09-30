import React from 'react';
import { UseChatHelpers } from 'ai/react';

import { Button } from '../ui/button';
import ExternalLink from './ExternalLink';
import { IconArrowRight } from '../ui/icons';

const EmptyScreen = ({ setInput }: Pick<UseChatHelpers, 'setInput'>) => {
    return (
        <div>EmptyScreen</div>
    );
};

export default EmptyScreen;