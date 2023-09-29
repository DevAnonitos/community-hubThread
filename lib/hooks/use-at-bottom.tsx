import React, { useEffect, useState } from "react";

const useBottom = (offset = 0) => {
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtBottom(
                window.innerHeight + window.scrollY >= document.body.offsetHeight - offset
            );
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [offset]);

    return isAtBottom;
};

export default useBottom;