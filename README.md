# Fritbot Module creation

[Fritbot](https://github.com/Urthen/fritbot) module master template and automation. This script creates a skeleton for clean Fritbot module development intended for public distribution. This script is *not* required if you only wish to develop a module for your own purposes and have no intent to distribute it, you can simply add your module to the `modules/` directory in your bot instance.

## Setup

* `npm install -g grunt-cli` to install grunt-cli globally
* `npm install` to install local requirements
* The first time you use this script, it will prompt you for your name and Github username. This information will be stored and templated in to all future modules you create. It can be modified by changing the `.config.json` file generated.

## Generating Modules

To generate a module, simply run `grunt create --name=your-lovely-module`. This will create a blank module matching that name in the folder containing `fb-module-master/`.

We recommend all module names developed by third parties follow the naming prefix convention:

* **fb-contrib-** for general purpose modules and scripts
* **fb-lang-** for language translation files
* **fb-pkg-** for packages of modules
* **fb-*(name)*-connector** for chat connectors
* Do not use *fb-opt-* or *fb-core-* as they are reserved for modules created and supported by the core Fritbot team.

Check [npmjs](https://www.npmjs.com/) before creating your module as you will need to publish your module, and cannot conflict with any names. If there are conflicts, get creative.

## Developing Modules

This is a quick overview of developing modules. For more information, see other Fritbot modules for examples.

Your `index.js` file is the entry point to your module: It tells Fribot information about the module, initialization functions, commands, listeners, and and child sub-modules the module has. It lives in the root directory of the module, other module code should live in `src/` if it is neccesary (though ultimately code structure is up to you).

As you are developing, you'll find it much easier to run a local version of your module rather than publishing, testing, tweaking, publishing again, etc. To do this, run `npm link` in the module directory, then `npm link (your module name)` in your bot instance directory. This will create a soft-link between the module directory and the node_modules in your bot instance, allowing you to work as if it were installed normally without having to publish it. Note this works locally but you will have to publish your module correctly before pushing a bot using it to Heroku.

The module loader looks for two things when deciding whether or not to load a package as a Fritbot module. If you are having trouble getting your module to load, ensure you have met the following:

* The module must have the *fritbot-module* keyword defined in `package.json`
* The module must have a `displayname` parameter exposed in `module.exports` by `index.js`

## Publishing Modules

Once you've gotten your module ready to go, [publish it to npmjs](https://docs.npmjs.com/getting-started/publishing-npm-packages) as you would any other package. Any other Fritbot user can now install and use your module! Read the npmjs docs for more information on how to publish and update your modules.