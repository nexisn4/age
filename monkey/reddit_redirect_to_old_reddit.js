// ==UserScript==
// @name         Redirect to Old Reddit
// @namespace    http://tampermonkey.net/
// @version      2025-05-16
// @description  Automatically redirect Reddit to Old Reddit, except media links
// @author       You
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const isMediaLink = window.location.pathname.startsWith('/media');

    if (window.location.hostname === 'www.reddit.com' && !isMediaLink) {
        const oldUrl = window.location.href.replace('www.reddit.com', 'old.reddit.com');
        window.location.href = oldUrl;
    }
})();
