'use client';

import { useReportWebVitals } from 'next/web-vitals'
import React from 'react'

const WebVitals = () => {
    useReportWebVitals((metric) => {
        console.log(metric);
    });
};

export default WebVitals;