
; (function (window) {

	'use strict';

	var support = { transitions: Modernizr.csstransitions },
		// transition end event name
		transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		onEndTransition = function (el, callback) {
			var onEndCallbackFn = function (ev) {
				if (support.transitions) {
					if (ev.target != this) return;
					this.removeEventListener(transEndEventName, onEndCallbackFn);
				}
				if (callback && typeof callback === 'function') { callback.call(this); }
			};
			if (support.transitions) {
				el.addEventListener(transEndEventName, onEndCallbackFn);
			}
			else {
				onEndCallbackFn();
			}
		},
		// the pages wrapper
		stack = document.querySelector('.pages-stack'),
		// the page elements
		pages = [].slice.call(stack.children),
		// total number of page elements
		pagesTotal = pages.length,
		// index of current page
		current = 0,
		homeScroll = document.getElementById('home_scroll'),
		scrollTop = document.querySelector('.scroll-top'),
		// menu button
		menuCtrl = document.querySelector('button.menu-button'),
		// the navigation wrapper
		nav = document.querySelector('.pages-nav'),
		// the menu nav items
		navItems = [].slice.call(nav.querySelectorAll('.link--page')),
		// check if menu is open
		isMenuOpen = false;

	function init() {
		// buildStack();
		initEvents();

	}

	// event binding
	function initEvents() {
		// menu button click
		menuCtrl.addEventListener('click', toggleMenu);

		// navigation menu clicks
		navItems.forEach(function (item) {
			// which page to open?
			item.addEventListener('click', function (ev) {
				openPage();
			});
		});
		
		homeScroll.addEventListener('scroll', function (ev) {
			homeScroll.scrollTop > 0 ?
				classie.add(scrollTop, 'scroll-top--active') :
				classie.remove(scrollTop, 'scroll-top--active');
		});

		scrollTop.addEventListener('click', function (ev) {
			
			homeScroll.scroll({
				top: 0,
				behavior: 'smooth'
			});
		});

		// clicking on a page when the menu is open triggers the menu to close again and open the clicked page
		pages.forEach(function (page) {
			var pageid = page.getAttribute('id');
			page.addEventListener('click', function (ev) {
				if (isMenuOpen) {
					openPage();
				}
			});

		});

		// keyboard navigation events
		document.addEventListener('keydown', function (ev) {
			if (!isMenuOpen) return;
			var keyCode = ev.keyCode || ev.which;
			if (keyCode === 27) {
				closeMenu();
			}
		});

	}



	// toggle menu fn
	function toggleMenu() {
		//console.log(isMenuOpen);
		if (isMenuOpen) {
			closeMenu();
		} else {
			openMenu();
			isMenuOpen = true;
		}
	}

	// opens the menu
	function openMenu() {
		// toggle the menu button
		classie.add(menuCtrl, 'menu-button--open')
		// stack gets the class "pages-stack--open" to add the transitions
		classie.add(stack, 'pages-stack--open');
		// reveal the menu
		classie.add(nav, 'pages-nav--open');

		var page = document.getElementById('home');
		page.style.WebkitTransform = 'translate3d(0, 75%, -200px)'; // -200px, -230px, -260px
		page.style.transform = 'translate3d(0, 75%, -200px)';

	}

	// closes the menu
	function closeMenu() {
		// same as opening the current page again
		openPage();
	}

	// opens a page
	function openPage(id) {

		var futurePage = document.getElementById('home');

		futurePage.style.WebkitTransform = 'translate3d(0, 0, 0)';
		futurePage.style.transform = 'translate3d(0, 0, 0)';
		futurePage.style.opacity = 1;

		onEndTransition(futurePage, function () {
			// close menu..
			classie.remove(menuCtrl, 'menu-button--open');
			classie.remove(nav, 'pages-nav--open');
			classie.remove(stack, 'pages-stack--open');
			
			// reorganize stack
			// buildStack();
			isMenuOpen = false;
		});
	}

	init();

})(window);