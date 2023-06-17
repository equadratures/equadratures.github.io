# Equadratures main site

## Introduction

This is the codebase for the main equadratures website.

## Running webserver for development

This codebase is using vanilla HTML5, CSS and JavaScript, and as such, any developer can use a local development server to get things going.

Even though the index.html file can be opened directly in a web-browser, for security reasons modern browsers by default block running JavaScript elements from local scripts (changing this default behaviour is not recommended), hence the need for running a local development server to run the JavaScript scripts.

This can be via http-server installed Node.js, Python's built-in option or many via many other options.

To start a webserver with Python, in a terminal, command prompt or Powershell, navigate to the code directory, and run the command:

```python
python -m http.server
```

This will start a server on port 8000 by default. To load the website, navigate to "http://127.0.0.1:8000/" in a browser.

To specify a different port, this can be provided as an argument:

```python
python -m http.server 8080
```

With this change, the website will now be accessible via "http://127.0.0.1:8000/"
