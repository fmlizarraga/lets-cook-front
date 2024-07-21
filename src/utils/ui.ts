type MessagesType = 'info' | 'success' | 'error';

export const copyContent = async (text: string): Promise<{type: MessagesType, message: string}> => {
    try {
        await navigator.clipboard.writeText(text);
        return {type: 'success', message: 'Copied to clipboard'};
    } catch (err) {
        console.error('Failed to copy: ', err);
        return {type: 'error', message: 'Failed to copy to clipboard'};
    }
};