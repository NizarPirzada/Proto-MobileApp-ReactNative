# Mobile App

## Setup

### Emulator

1. Install Android Studio
2. Download and run Pixel 2 Emulator

### Android Setup
In order to enable app verification via phone number, we need to enable SafetyNet. See [link](https://firebase.google.com/docs/auth/android/phone-auth).

For that, we need to first get a debug certificate fingerprint. For password, you can use `android`.
```
keytool -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore
```

If you don't already have a keystore `debug.keystore` (i.e. the above command failed), you can generate it using
```
keytool -genkey -v -keystore ~/.android/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```


### Code Setup

1. Clone repository using Git
2. Install Node.js (v14+)
3. Install dependencies using `npm install`

### Visual Studio Code

1. Install Visual Studio Code
2. Install React Native Extension
3. Create `.vscode/launch.json` file with the following contents
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "Attach to packager",
         "request": "attach",
         "type": "reactnative",
         "cwd": "${workspaceFolder}"
       },
       {
         "name": "Debug Android",
         "request": "launch",
         "type": "reactnative",
         "cwd": "${workspaceFolder}",
         "platform": "android"
       }
     ]
   }
   ```

### Running the app

- Method 1: Click on `Debug Android` option in VSCode's Run menu on the left
- Method 2: Run `npm run android` in the command line

## Main Code Features/Tools

- [TypeScript](https://www.typescriptlang.org/)
- React Native
- Redux
- [Redux Toolkit](https://redux-toolkit.js.org/)
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) with [API Code Generation](https://redux-toolkit.js.org/rtk-query/usage/code-generation)

## API Code Generation

Whenever the OpenAPI spec is updated in https://meecha-rest-api-doc-kwiwycc2eq-uc.a.run.app, run `npm run generate` to generate new API code in the `generated` folder as `api.generated.ts`. The URL used is in `utils/baseQuery.ts`. **Important**: Please update this base URL for your respective server URL. Eventually, this base URL will be stored as an environment variable.

## Folder/File Structure

### Important

- `components`: React Native component files
- `constants` (Not yet created): Constants files.
- `generated`: Generated code
- `store`: Redux related files including actions, reducers, selectors, store, slices, middleware, and api.
- `utils`: Utility files containing helper functions.

### Others

- `android`: Android specific files
- `ios`: IOS specific files
- `.husky`: Pre-commit hook for linting/formatting.
