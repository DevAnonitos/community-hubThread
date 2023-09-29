"use client";

import React, { useState, useTransition } from 'react';
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

    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                
            </AlertDialog>
        </>
    );
};

export default ClearHistory;