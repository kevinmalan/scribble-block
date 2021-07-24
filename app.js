var app = new Vue({
    el: '#app',
    data: {
        words: '',
        wordCount: 0,
        wordPairs: {},
        search: '',
        highlighted: {
            previousWord: '',
            indexAfterWord: -1
        }
    },
    methods: {
        analyzeWords: function () {
            var words = this.words.replace("\n", " ").replace("\t", " ");
            var wordArr = getWordArray(words.replace(/[.,\/#!$?@#^%\^&\*;:{}=\-_`~()]/g, ""));
            this.wordCount = getWordCount(wordArr);
            this.wordPairs = getWordPairs(wordArr);
        },
        save: function () {
            window.localStorage.setItem('words-1', this.words);
        },
        load: function () {

            this.words = window.localStorage.getItem('words-1');
            this.analyzeWords();
        },
        highlight: function (word) {
            this.search = word;
            var textarea = document.getElementById("words");
            var index = -1;

            if (this.highlighted.previousWord === word) {
                var subString = textarea.value.substring(this.highlighted.indexAfterWord);
                index = subString.indexOf(word);
                if (index != -1) {
                    index += this.highlighted.indexAfterWord;
                }
            }

            if (index == -1) {
                index = textarea.value.indexOf(word);
            }

            var indexAfterWord = index + word.length;
            textarea.focus();
            textarea.setSelectionRange(index, indexAfterWord);
            textarea.scrollTop = indexAfterWord / 2;
            this.highlighted.previousWord = word;
            this.highlighted.indexAfterWord = indexAfterWord;
        }
    }
})

function getWordArray(words) {
    return words.split(" ").filter(function (value) {
        return value != "" && isNaN(value);
    });
}

function getWordCount(wordArr) {
    return wordArr.length;
}

function getWordPairs(wordArr) {
    var wordPairs = {};
    wordArr.forEach(word => {
        if (word in wordPairs) {
            wordPairs[word] += 1;
        }
        else {
            wordPairs[word] = 1;
        }
    });

    var wordPairsSorted = sortObjectByValueDescending(wordPairs);

    var wordPairArr = [];
    var index = 0;
    var rowLength = 0;
    for (key in wordPairsSorted) {
        rowLength += key.length;
        if (rowLength > 23) {
            index++;
            rowLength = 0;
        }

        if (wordPairArr[index] == undefined) {
            var obj = {};
            obj[key] = wordPairsSorted[key];
            wordPairArr.push(obj);
        } else {
            wordPairArr[index][key] = wordPairsSorted[key];
        }
    }

    return wordPairArr;
}

function sortObjectByValueDescending(obj) {
    var keysSortedByValueArr = Object.keys(obj).sort(function (a, b) {
        return obj[b] - obj[a];
    });

    var objSorted = {};
    for (key of keysSortedByValueArr) {
        objSorted[key] = obj[key];
    }

    return objSorted;
}