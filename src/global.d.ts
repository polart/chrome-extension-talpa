declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.json' {
    const content: string;
    export default content;
}

declare interface Window {
    __EXT_TALPA_ID__: string;
}

declare type DetectedLoc = {
    id: string | null;
    defaultMessage: string | null;
    text: string;
    lang: string;
    debugInfo: string | null;
};
