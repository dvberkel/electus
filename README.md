Electus
=======

Electus allows you to agree/disagree with a statement in real time.

Setup
-----

Electus is setup as a [node module][1] and uses [grunt][2] to automate
various tasks. Run the following command to install all the
dependencies

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

[1]: https://github.com/joyent/node/wiki/modules "Node.js documentation on modules"
[2]: http://gruntjs.com/ "grunt.js homepage"
[3]: https://github.com/remy/nodemon "Nodemon on GitHub"
[4]: http://socket.io/ "Socket.io homepage"