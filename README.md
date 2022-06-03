# react_module_template

This is a Nexus Wallet Module template built with React and Redux. It also includes some example usages for advanced features and boilerplate code for integrating those features into a module.

### How to use this template to develop your own Nexus Wallet module

1. Click "Use this template" button at the top right corner ⇗
2. Name your new github repository and fill other information as required, then click "Create repository from template".
3. Clone your newly created repository to your local machine.
4. Modify the module code as you wish. Check out [Developer's guide to Nexus Wallet Module](https://github.com/Nexusoft/NexusInterface/tree/master/docs/Modules) to learn more about the module development and testing process.

### How to test this template module

1. Download and install the [latest version of Nexus Wallet](https://github.com/Nexusoft/NexusInterface/releases/latest) if you haven't.
2. Download [this template module's zip file](https://github.com/Nexusoft/react_redux_module_template/releases/latest).
3. Open Nexus Wallet, go to Settings/Modules, drag and drop the zip file you've downloaded into the "Add module" section and click "Install module" when prompted.
4. After the wallet refreshes, an item for this template module will be added into the bottom navigation bar. Click on it to open the module.

### Build instructions (for module verification)
1. clone this repository and move to it:

`git clone git@github.com:SwapzoneIO/nexus-wallet-integration.git`

`cd nexus-wallet-integration`

2. checkout the develop branch:

`git checkout develop`

3. install node_modules:

`npm install`

4. run the project in development mode:

`npm run dev`

5. open Nexus Wallet app and go to Settings page (Application tab)

6. make sure "Developer mode" setting is on and "Module open source policy" setting is off, or you will not be able to install your module.

7. go to Nexus Wallet Settings page (Modules tab)

8. Click "Add module" and pick this module's repository folder in finder

also you can zip this module's repository folder and use .zip file to add the module