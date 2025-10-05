import React, { useState, useMemo } from 'react';
import './TextAnalyzer.css';

const TextAnalyzer = () => {
    const [text, setText] = useState('');

    const analysis = useMemo(() => {
        if (!text.trim()) {
            return {
                words: 0,
                characters: 0,
                sentences: 0,
                paragraphs: 0,
                readingTime: 0,
            };
        }

        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const characters = text.length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;
        const readingTime = Math.ceil(words / 200);

        return { words, characters, sentences, paragraphs, readingTime };
    }, [text]);

    const StatCard = ({ label, value }) => (
        <div className="stat-card">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );

    return (
        <div className="analyzer-container">
            <h1 className="analyzer-title">Text Analyzer</h1>
            <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here..."
            ></textarea>
            <div className="stats-grid">
                <StatCard label="Words" value={analysis.words} />
                <StatCard label="Characters" value={analysis.characters} />
                <StatCard label="Sentences" value={analysis.sentences} />
                <StatCard label="Paragraphs" value={analysis.paragraphs} />
                <StatCard label="Reading Time" value={`${analysis.readingTime} min`} />
            </div>
        </div>
    );
};

export default TextAnalyzer;