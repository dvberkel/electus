Electus [![Build Status](https://travis-ci.org/dvberkel/electus.png?branch=master)](https://travis-ci.org/dvberkel/electus)
=======

Electus allows you to agree/disagree with a statement in real time.

Setup
-----

Electus is setup as a [node module][1] and uses [grunt][2] to automate
various tasks. Run the following command to install all the
dependencies, except [PhantomJS][8]. Go to the [PhantomJS download
section][9] for instructions how to setup PhantomJS.

    npm install

The next command runs the default grunt task

    ./node_modules/.bin/grunt

An other option is to add `<PROJECT_DIR>/node_modules/.bin/` to you
path and just execute `grunt`.

Development
-----------

[nodemon][3] is a great tool that can be used during development. It
watches certain files and restarts a server when these changes.

It can be used in the following manner

    ./node_modules/.bin/nodemon app.js

This will start a [socket.io][4] server listening on port `3435`.

### Running test

We use [jasmine][10] to test our application. Open the
'SpecRunner.html' in a browser to see the test results.

You could also run

    ./node_modules/.bin/grunt jasmine

to have the tests automatically run. This depends on [PhantomJS][8] to
be available on the path. Furthermore is generates a
'_SpecRunner.html' which should not be confused for the
`SpecRunner.html` for the browser.

When adding new specifications they should be included in two places

1. SpecRunner.html
2. spec/template/_SpecRunner.html

Deployement
-----------

[Nodejitsu][6] is used as an cloud application platform. The excellent
[getting started][7] tutorial informs you how to use the `jitsu`
command to deploy the application.

At the moment the application used the developer sandbox. This may
change in the future.

License
-------

Electus is licensed under the [MIT License][5].

[1]: https://github.com/joyent/node/wiki/modules "Node.js documentation on modules"
[2]: http://gruntjs.com/ "grunt.js homepage"
[3]: https://github.com/remy/nodemon "Nodemon on GitHub"
[4]: http://socket.io/ "Socket.io homepage"
[5]: https://github.com/dvberkel/electus/blob/master/LICENSE-MIT
[6]: http://nodejitsu.com/ "nodejitsu homepage"
[7]: http://nodejitsu.com/paas/getting-started.html "Getting started with nodejitsu"
[8]: http://phantomjs.or/ "PhantomJS homepage"
[9]: http://phantomjs.org/download.html "Instructions how to acquire PhantomJS"
[10]: http://pivotal.github.com/jasmine/ "Jasmine homepage"