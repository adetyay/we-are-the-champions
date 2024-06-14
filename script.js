// javascript
// scroll test area with mouse wheel
document.getElementById('text').addEventListener('wheel', function(event) {
    let textarea = this;
    let scrollTop = textarea.scrollTop;
    textarea.scrollTop = scrollTop + event.deltaY;
    event.preventDefault();
});