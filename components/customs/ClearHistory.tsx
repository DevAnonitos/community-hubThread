"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from '../ui/toast';

import { ServerActionResult } from '@/lib/types';
import { Button } from '../ui/button';

import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from '../ui/alert-dialog';

import { IconSpinner } from '../ui/icons';

interface ClearHistoryProps {
    clearChats: () => ServerActionResult<void>;
};

const ClearHistory = ({ clearChats }: ClearHistoryProps) => {
    return (
        <div>ClearHistory</div>
    );
};

export default ClearHistory;