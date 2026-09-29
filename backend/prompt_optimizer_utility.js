const optimizePrompt = (prompt) => {
    if (!prompt || typeof prompt !== 'string') {
        return '';
    }

    const fillerWords = new Set([
        'a', 'an', 'the', 'very', 'really', 'just', 'simply', 'basically',
        'obviously', 'literally', 'actually', 'honestly', 'please', 'kind', 'of',
        'sort', 'kindof', 'sortof', 'like', 'um', 'uh', 'you', 'know', 'maybe',
        'perhaps', 'overall', 'etc', 'i', 'me', 'my', 'we', 'our', 'us', 'is',
        'are', 'was', 'were', 'be', 'been', 'being', 'to', 'too', 'also', 'and',
        'but', 'or', 'if', 'then', 'than', 'so', 'as', 'at', 'on', 'in', 'for',
        'with', 'without', 'from', 'into', 'onto', 'about', 'after', 'before', 'under',
        'over', 'between', 'through', 'throughout', 'around', 'within', 'while', 'because',
        'however', 'there', 'here', 'that', 'this', 'these', 'those', 'it', 'its'
    ]);

    let optimizedPrompt = prompt
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    optimizedPrompt = optimizedPrompt
        .replace(/[^\w\s.,!?-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    const words = optimizedPrompt
        .split(' ')
        .map((word) => word.replace(/[.,!?;:]+$/g, '').trim())
        .filter((word) => {
            const normalized = word.toLowerCase();
            return normalized && !fillerWords.has(normalized);
        });

    optimizedPrompt = words.join(' ');
    optimizedPrompt = optimizedPrompt.replace(/\s+([.,!?])/g, '$1');
    optimizedPrompt = optimizedPrompt.replace(/\s+/g, ' ').trim();

    return optimizedPrompt;
};

module.exports = { optimizePrompt };
