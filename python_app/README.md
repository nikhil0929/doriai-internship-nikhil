
This Python server was created using Flask (https://flask.palletsprojects.com/en/1.1.x/)

# Starting the Flask Server

Before starting the server, you must set the FLASK_APP enviornment variable:

```
export FLASK_APP=server.py
```

To start the server:

```
flask run
```

To run the server in debug mode:

```
export FLASK_ENV=development
```

Debug mode allows the server to automatically restart whenever there has been saved changes to the code
