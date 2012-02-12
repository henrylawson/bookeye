var PULL_BUTTON_ID = '#pullButton';
var SEARCH_FIELD_ID = '#Search';
var LOADED_PULL_BUTTON_TEXT = 'Pull';
var LOADING_PULL_BUTTON_TEXT = '...';
var LOADING_PULL_BUTTON_CLASS = 'loading';
var JSON_GOOGLE_API_URL = '/books/google_book_search/';
var BOOK_EDITOR_TITLE_FIELD_ID = '#book_title';
var BOOK_EDITOR_AUTHOR_FIELD_ID = '#book_author';
var BOOK_EDITOR_YEAR_FIELD_ID = '#book_year';

start($.getJSON);

function start(ajaxJsonEngine) {
	$(document).ready(function() {
		var button = $(PULL_BUTTON_ID);
		var searchTextField = $(SEARCH_FIELD_ID);
		button.click(function() {
			queryServiceForBookData(ajaxJsonEngine, button, searchTextField);
		});
		searchTextField.keypress(function(key) {
			if (key.which == 13) {
				queryServiceForBookData(ajaxJsonEngine, button, searchTextField);
			}
		});
	});
}

function setElementsToLoaded(button) {
	button.text(LOADED_PULL_BUTTON_TEXT);
	button.removeClass(LOADING_PULL_BUTTON_CLASS);
}

function setElementsToLoading(button) {
	button.text(LOADING_PULL_BUTTON_TEXT);
	button.addClass(LOADING_PULL_BUTTON_CLASS);
}

function displayBook(book) {
	$(BOOK_EDITOR_TITLE_FIELD_ID).val(book.title);
	$(BOOK_EDITOR_AUTHOR_FIELD_ID).val(book.author);
	$(BOOK_EDITOR_YEAR_FIELD_ID).val(book.year);
}

function queryServiceForBookData(ajaxJsonEngine, button, searchTextField) {
	var searchTerm = searchTextField.val();
	if (searchTerm == '') return;
	var searchEncoded = encodeURIComponent(searchTerm);
	var requestUrl = JSON_GOOGLE_API_URL + searchEncoded;
	setElementsToLoading(button)
	ajaxJsonEngine(requestUrl, function(book) {
		displayBook(book);
		setElementsToLoaded(button);
	});
}