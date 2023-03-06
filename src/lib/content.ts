// API
const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/content`;

const fetchContent = async () => {
    // Make a get request to the api and extract content here
    return window.fetch(ENDPOINT);
};

const parseContentIntoSentences = (content: string): Array<string> => {
    const contentIntoSentences: Array<string> = [];
    content.replace(/<s>(.*?)<\/s>/g, (match, g1) => {
        contentIntoSentences.push(`${g1}`);
    });
    // Implement a parser that takes an ssml string and returns an array of sentences.
    // Refrain from embedding elements in the dom or using DOMParser in the final solution.
    return contentIntoSentences;
};

export { fetchContent, parseContentIntoSentences };
