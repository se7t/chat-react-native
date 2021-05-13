<h1 align="center">
  Slick Chat App
</h1>

A chat app built with React Native, TypeScript and TailwindCSS.
<br/>

## 🔬 Technologies

1.  **React Native**

    "An open-source mobile application framework created by Facebook, Inc. It is used to develop applications for Android, iOS, Web, [...], and Windows by enabling developers to use React's framework along with native platform capabilities."

    [`https://reactnative.dev/`](https://reactnative.dev/)

1.  **TypeScript**

    "[...] An open-source language which builds on JavaScript, one of the world's most used tools, by adding static type definitions."

    [`https://www.typescriptlang.org/`](https://www.typescriptlang.org/)


1.  **TailwindCSS**

    "A collection of beautiful, fully responsive UI components, designed and developed by us, the creators of Tailwind CSS."
    [`https://tailwindcss.com/`](https://tailwindcss.com/)

1.  **GraphQL**

    "A query language for APIs and a runtime for fulfilling those queries with your existing data."

    [`https://graphql.org/`](https://graphql.org/)

1.  **Apollo**

    "Simplify app development by combining APIs, databases, and microservices into a single data graph that you can query with GraphQL"

    [`https://www.apollographql.com/`](https://www.apollographql.com/)


## 🖥️ Installation

Install Expo CLI.

```bash
$ npm install -g expo-cli
```

Clone the Slick Chat App repository.

```bash
$ git clone https://github.com/se7t/chat-react-native.git
```

Use [Expo CLI](https://docs.expo.io/workflow/expo-cli/) to install Slick Chat App.

```bash
$ expo install
```

Create a `.env` file in root directory with the following content:

```
// This app uses Json Web Token for authorization.
REACT_NATIVE_HTTP_URI=
REACT_NATIVE_WSS_URI=
REACT_NATIVE_CHAT_AUTH_TOKEN=
```

Install Expo Go app on your device of choice: [iOS](https://apps.apple.com/us/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US).

For more in-depth Expo installation instructions, visit [docs.expo.io](https://docs.expo.io/get-started/installation/).


## 🧰 Usage

Use the package manager [Expo CLI](https://docs.expo.io/workflow/expo-cli/) to start the development server.

```bash
$ expo start
```
Open Expo Go app on your device and scan the QR code available in Metro (`http://localhost:19002/`).


## 📓 Additional notes

Currently this app does not provide the user with a way to Log in or Sign up. The authorization is done solely with the use of JWT provided in `.env` file.

## 📄 License
[MIT](https://github.com/se7t/disney-plus-react/LICENSE.md)
