var app = new Vue({
    el: '#app',
    data: {
        words: '',
        wordCount: 0,
        wordPairs: {}
    },
    methods: {
        analyzeWords: function () {
            var words = this.words;
            var wordArr = getWordArray(words.replace(/[.,\/#!$?@#^%\^&\*;:{}=\-_`~()]/g,""));
            this.wordCount = getWordCount(wordArr);
            this.wordPairs = getWordPairs(wordArr);
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

function getWordPairs(wordArr) {
   var wordPairs = {};
   wordArr.forEach(word => {
       if (word in wordPairs) {
           wordPairs[word] += 1;
       }
       else 
       {
           wordPairs[word] = 1;
       }
   });

   return sortObjectByValueDescending(wordPairs);
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