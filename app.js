var app = new Vue({
    el: '#app',
    data: {
        wordsCount: 0,
        words: ''
    },
    methods: {
        countWords: function () {
            var arr = removeEmptyElements(this.words.split(" "));
            this.wordsCount = arr.length;
        }
    }
  })

function removeEmptyElements(arr) {
    return arr.filter(function(value) {
        return value != "";
    });
}