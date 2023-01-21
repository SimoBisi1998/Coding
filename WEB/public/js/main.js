"use strict";

import App from './app.js';

const navContainer = document.querySelector('#set-invisible');
const appContainer = document.querySelector('#first-container');
const searchContainer = document.querySelector('#search-bar');
const navLeft = document.querySelector('#create-project');

const app = new App(navContainer,appContainer,searchContainer,navLeft);

