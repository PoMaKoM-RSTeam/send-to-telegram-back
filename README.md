# Post management system for Telegram messenger

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/PoMaKoM-RSTeam/send-to-telegram-back?style=for-the-badge)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/PoMaKoM-RSTeam/send-to-telegram-back?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/PoMaKoM-RSTeam/send-to-telegram-back?style=for-the-badge)

## Table of contents

- [Introduction](#introduction)
- [How to run application](#how-to-run-application)
- [Getting help](#getting-help)
- [Contributing](#contributing)
- [License](#license)
- [Authors and history](#authors-and-history)

## Introduction

RS Clone is an alternate final stage#2 project in RS.SCHOOL. This is a team mission in the course of which you need to develop a clone of a game or application. The team itself chooses the topic of the project. It can be either an exact or a simplified copy of an existing project, or your own application.
Our team chose to create a clone of the application for managing posting to channels in a telegram

Node.js server with database. Serves Telegram Bot + Frontend API:

- Implements REST API for all functions of the Frontend part (see above).
- Storing in the database all the necessary information (roles, posts, messages).
  Further, the Bot's capabilities (some functions of the front will be duplicated, as intended):
- Maintaining a channel, creating posts, editing posts.
- Sending postponed messages on a schedule, adding buttons, mailings, pinning, deleting posts and pins (including by timer), and more.
- Ability to manage multiple channels, multiposting (sending messages to multiple channels).
- Ability to assign roles to users (owner, administrator, editor, author).
- Notification of new messages from users, the ability to reply.
- Suggestions for posts (if the user does not have more than one role, he can also create a post, but it will go to moderation and, after approval and editing, can be published).

[Front-End](https://github.com/PoMaKoM-RSTeam/send-to-telegram-front/blob/develop/README.md)

## How to run application

Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Getting help

For help and advice on using this application, you can write to email or find contacts in the developer repositories (listed below).

## Contributing

Like any beginner team, we welcome any help and participation in improving the functionality of our application. Feel free for fork aor repository an PR after improve features.

## License

Mozilla Public License (MPL) version 2.0
This projectis distributed under the terms of the [Mozilla Public License (MPL) version 2.0](https://www.mozilla.org/en-US/MPL/2.0/). The MPL fills a useful space in the spectrum of free and open source software licenses, sitting between the Apache license, which does not require modifications to be shared, and the GNU family of licenses, which requires modifications to be shared under a much broader set of circumstances than the MPL.

[Mozilla Public License FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/)

## Authors and history

RS Clone is an alternate final stage#2 project in RS.SCHOOL. This is a team mission in the course of which you need to develop a clone of a game or application. The team itself chooses the topic of the project. It can be either an exact or a simplified copy of an existing project, or your own application.

Authors

- [PoMaKoM [Team Lead & Mentor]](https://github.com/PoMaKoM)
- [alexxg0152 [Backend developer (node.js, js)]](https://github.com/alexxg0152)
- [andrewmakarevich [Backend developer (node.js, js)]](https://github.com/andrewmakarevich)
- [gomunkool [Frontend developer (HTML, CSS, TS, JS)]](https://github.com/gomunkool)
- [KaterinaKachann [Frontend developer (HTML, CSS, TS, JS)]](https://github.com/KaterinaKachann)
