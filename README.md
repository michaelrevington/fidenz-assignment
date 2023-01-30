# Fidenz Assignment

`API_KEY` environment variable is required for the application to run since it uses [` openweathermap `](https://openweathermap.org/). Head over to the website, you can get a free api key when you sign up.

## Development Server

```
  
    git clone <https://github.com/michaelrevington/fidenz-assignment.git>
    cd fidenz-assignment
    npm i
    npm run dev
  
```

## Docker

Replace `${PORT}` with a port number you want.

### Local

```

    git clone <https://github.com/michaelrevington/fidenz-assignment.git> 
    cd ./fidenz-assignment 
    docker build --build-arg PORT=${PORT} -f Dockerfile -t fidenz:latest . 

```

### Git Repo

```
 
    docker build  --build-arg PORT=${PORT}  <https://github.com/michaelrevington/fidenz-assignment.git#main> -t fidenz:latest 

```
