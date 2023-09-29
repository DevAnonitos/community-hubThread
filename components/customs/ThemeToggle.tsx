"use client";

import React, { useState, useTransition } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '../ui/button';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const [_, startTransition] = useTransition();

    return (
            <Button
                variant="ghost"
                size="default"
                onClick={() => {
                    startTransition(() => {
                        setTheme(theme === 'light' ? 'dark' : 'light');
                    })
                }}
            >
                {!theme ? null : theme === 'dark' ? (
                    <div className='transition-all'>
                        light
                    </div>
                ) : (
                    <div className='transition-all'>
                        dark
                    </div>
                )}
                <span className="sr-only">Toggle theme</span>
            </Button>
    );
};

export default ThemeToggle;