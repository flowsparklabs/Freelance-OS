import React from 'react';
import * as icons from 'lucide-react';

const Icon = ({ name, size = 20, className = "" }) => {
    const LucideIcon = icons[name];

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return <LucideIcon size={size} className={className} />;
};

export default Icon;
