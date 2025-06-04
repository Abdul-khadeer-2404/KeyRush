const commonWords = [
    "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
    "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their",
    "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him",
    "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only",
    "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want",
    "because", "any", "these", "give", "day", "most", "us", "is", "water", "long", "find", "here", "thing", "great", "man", "world", "life",
    "still", "public", "human", "read", "left", "put", "end", "why", "let", "home", "big", "high", "such", "follow", "act", "own", "line",
    "ask", "men", "change", "went", "light", "kind", "off", "need", "house", "picture", "try", "again", "animal", "point", "mother", "learn",
    "place", "move", "right", "boy", "old", "too", "same", "tell", "does", "set", "three", "state", "never", "become", "between", "high",
    "really", "something", "most", "another", "much", "family", "own", "leave", "put", "old", "while", "mean", "keep", "student", "why",
    "important", "world", "look", "thought", "help", "system", "run", "each", "right", "rule", "move", "where", "number", "every", "start",
    "local", "book", "far", "took", "head", "example", "begin", "life", "always", "those", "both", "paper", "together", "got", "group",
    "often", "business", "issue", "area", "development", "case", "show", "government", "small", "number", "company", "part", "during",
    "house", "service", "hand", "experience", "important", "until", "children", "side", "feet", "car", "mile", "night", "walk", "white",
    "sea", "began", "grow", "river", "four", "carry", "state", "once", "book", "hear", "stop", "without", "second", "later", "miss", "idea",
    "enough", "eat", "face", "watch", "far", "indian", "really", "almost", "let", "above", "girl", "sometimes", "mountain", "cut", "young",
    "talk", "soon", "list", "song", "being", "leave", "family", "it's", "body", "music", "color", "stand", "sun", "questions", "fish",
    "area", "mark", "dog", "horse", "birds", "problem", "complete", "room", "knew", "since", "ever", "piece", "told", "usually", "didn't",
    "friends", "easy", "heard", "order", "red", "door", "sure", "become", "top", "ship", "across", "today", "during", "short", "better"
];

const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
    "The five boxing wizards jump quickly.",
    "Bright vixens jump; dozy fowl quack.",
    "Quick wafting zephyrs vex bold Jim.",
    "Programming is not about typing, it's about thinking.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "In the middle of difficulty lies opportunity.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "It is during our darkest moments that we must focus to see the light.",
    "The way to get started is to quit talking and begin doing.",
    "Innovation distinguishes between a leader and a follower.",
    "Life is what happens to you while you're busy making other plans.",
    "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.",
    "Be yourself; everyone else is already taken."
];

function generateWords(count = 50) {
    const words = [];
    for (let i = 0; i < count; i++) {
        words.push(commonWords[Math.floor(Math.random() * commonWords.length)]);
    }
    return words;
}

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}