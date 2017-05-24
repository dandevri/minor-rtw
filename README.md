# minor-rtw

![Github Banner](github/GitHub_Banner.jpg)
> Real-Time note taking app

## :book: Introduction

With **YouPad** you can take notes with other students, in real-time! Load in a youtube video through the url and off you go. You don't even have to create a profile. Just log in with your Google account and you are settled.

1. Enter your Youtube URL
1. Hit add to get the Youtube video
1. Take notes in the box below
1. See notes from other students

## ⚙ Installation & Development

### Prerequisites
#### Software
* Make sure you have [`node`](https://nodejs.org/en/) installed on your machine.

### Installing

#### Node server
Here are the instructions to get the node server up and running.

1. Clone this project to your local machine and change directory/
```
$ git clone https://github.com/dandevri/minor-rtw.git && cd minor-rtw
```

1. Install the dependencies and start the server.
```
$ npm start
```

1. You should see the following message in your terminal.
```
Server running 0.0.0.0:3000
```

#### Built With
* [`express 4.15.3`](https://expressjs.com/): Web application framework used for basic routing
* [`ejs 1.0`](http://www.embeddedjs.com/): Client side templating engine
* [`socket.io 2.0.1`](https://socket.io/): Real-Time engine framework  

**External**
* [`Google Identity`](https://developers.google.com/identity/): Authenticating flow
* [`Youtube iFrame API`](https://developers.google.com/identity/): Video loading

## :page_facing_up: Contributing
Please read [Contributing](CONTRIBUTING.md) for details on how to contribute to this project.  
To see a list of everybody who participated go to the [Contributors](https://github.com/dandevri/minor-rtw/graphs/contributors) page.

## :white_check_mark: Todo's
To see all upcoming todo's and features please navigate to the [GitHub Projects](https://github.com/dandevri/minor-rtw/projects/) page of this repo.

## License
This project is licensed under the [MIT](LICENSE.MD) License - © Danny de Vries 2017

## Acknowledgments
* [Tutus Wormer](https://github.com/wooorm)
* Laurens Arnoudse
