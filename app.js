var app = new Vue({
    el: '#app',
    data: {
        wordCount: 0,
        words: ''
    },
    methods: {
        analyzeWords: function () {
            var wordArr = getWordArray(this.words);
            this.wordCount = getWordCount(wordArr);
        }
    }
  })

function getWordArray(words) {
    return words.split(" ").filter(function(value) {
        return value != "";
    });
}

function getWordCount(wordArr) {
    return wordArr.length;
}