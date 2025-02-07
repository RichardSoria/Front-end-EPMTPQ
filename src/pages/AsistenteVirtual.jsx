import React, { useEffect } from 'react';

export default function AsistenteVirtual() {
    useEffect(() => {
        // Inyectar el script del webchat de Botpress
        const botpressScript = document.createElement('script');
        botpressScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        botpressScript.async = true;
        document.body.appendChild(botpressScript);

        // Inyectar el script específico del bot
        const botScript = document.createElement('script');
        botScript.src = "https://files.bpcontent.cloud/2025/02/02/23/20250202231708-62196X0U.js";
        botScript.async = true;
        document.body.appendChild(botScript);

        return () => {
            document.body.removeChild(botpressScript);
            document.body.removeChild(botScript);
        };
    }, []);

    return <div id="chat-container"></div>;
}
