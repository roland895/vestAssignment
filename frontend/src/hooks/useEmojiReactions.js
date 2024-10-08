import { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3001'; 

const useEmojiReactions = () => {
    const [emojiReactions, setEmojiReactions] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const fetchReactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/getReactions`);
            const data = await response.json();
            setEmojiReactions(data);
        } catch (err) {
            setError(err.message || 'Error fetching reactions');
        } finally {
            setLoading(false);
        }
    };

    const addReaction = async (userId, timestamp, emoji, x, y) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/addReaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ timestamp, userId, emoji, x, y }),
            });
            const jsonRes = await response.json();
            if (jsonRes.success) {
                setEmojiReactions(jsonRes.updatedReactions)
            } else {
                setError('Failed to add reaction');
            }
        } catch (err) {
            setError(err.message || 'Error adding reaction');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReactions();
    }, []);

    return {
        emojiReactions,
        loading,
        error,
        addReaction,
        fetchReactions,
    };
};

export default useEmojiReactions;
