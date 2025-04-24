# Learn React

Youtube: https://www.youtube.com/watch?v=G6D9cBaLViA

Tech:
- vite
- javascript (not ts)


## Improvements to Make

1. Live update / recommended searches while typing

2. If no movie_poster exists, show a default image

3. Ability for user to change number of columns (3, 4, 5 ?)

4. Sort by options in search (release date, ratings, etc.)

5. Login & Passwords

    - database & backend


## Setup Project

`$ npm create vite@latest`


```
name: frontend
framework: React
variant: javascript
```

`$ cd frontend`

`$ npm install`


### Setup for VM (Optional)

I'm working on a Linux VM running on Windows so below is for that scenario:

To access Vite server on VM from Windows, must configure `vite.config.js`
```
server {
    host: true,
    allowedHosts: ['ubuntu-vm'] // optional
},
```

- host:

    uses 0.0.0.0 instead of localhost
    since they're 2 different machines, localhost won't work between them


- allowedHosts:

    I set the Windows equivalent of /etc/hosts so VM's IP is resolved from ubuntu-vm


To access Vite server from Windows:

    http://ubuntu-vm:5173


## Create .ENV File

.env file will hold the API Key or Token to access the API

Use `VITE_` prefix to be recognized by Vite


```
VITE_API_KEY=
VITE_API_TOKEN=
```
You only need either the Key or Token, not both

    - Token is recommended, give to Request Header
    - Key can be used, supplied via URL
    - usage in `./src/services/api.js`


**NOTE:** 

    Add it to .gitignore so it's not pushed to your repo


## Movie Card Component
Timestamp: 20:00

Create the first Component `MovieCard`

    - frontend/src/components


Interfaces are only in Typescript, this is Javascript  
So no interfaces for defining objects


Create the MovieCard component, only requires JSX (the HTML being returned)

Import the MovieCard component into App.jsx to be rendered


## Conditional Rendering
Timestamp: 29:00

Allows you to redner dynamically, based on a condition


Syntax: x === num ? <if true use this> : <if false use this>


```
    {movieNumber === 1 ? (
        <MovieCard movie={{ title: 1st choice }}/> 
    ) : (
        <MovieCard movie={{ title: 2nd choice }}/>
    )}
```


Another option is to render a single object if a condition is met
- if value / statement is true, then render


Syntax: x === num && <an object>
```
    {movieNumber === 1 && <MovieCard movie={{ title: create if true }}/>}
```


## Home Page & map()
Timestamp:32:30

1. Create the 'pages' directory in /src, then create a Homepage and Favorites

- src/pages/Home.jsx
- src/pages/Favorites.jsx

Home: display multiple movies, search for movies
Favorite: save liked movies to a separate page

`.map()`:

    Performs a defined function on every item in a list

    Add the key{} property so that React can know which component to update,  
    based on the interactions with the webpage

    - mark every component with a unique identifier to handle state changes
    - even though MovieCard does not define a .key property


2. Update App.jsx

Remove the MovieCard import

    - MovieCard is being imported from the `Home` function

Replace the MovieCard components with Home page


3. Add Forms to Home page

Create a form and search button & add an onSubmit function when clicked


## useState
Timestamp: 40:00

- Docs: https://react.dev/reference/react/useState

State is an inital value that when changed, will re-render itself
to show the newly updated State


The `useState` React Hook takes 1 parameter - the initial State

`useState` returns 2 values, the 1st to save the state's value,
and the 2nd to set the new state's value


Syntax: 

- const [state, setState] = useState(initialState)

    - state -> the initial value / name of the current state
    - setState -> function to set the new value to be saved


initialState: 

    The value you want the state to be initially.
    It can be a value of any type, but there is a special behavior for functions.
    This argument is ignored after the initial render.

    If you pass a function as initialState, it will be treated as an
    initializer function. It should be pure, should take no arguments,
    and should return a value of any type.
    React will call your initializer function when initializing the component,
    and store its return value as the initial state. See an example below.


useState returns an array with exactly two values:

    The current state.
    During the first render, it will match the initialState you have passed.

    The set function that lets you update the state to a different value and 
    triggers a re-render.


## Implementing State
Timestamp: 40:20

We're going to store the name of the movie that a user types into the search bar,
and use it later within logic or JSX

- allows you to track whats typed into the search bar


Connect all the <form/> elements to a piece of State, and you can utilize
that State within your component as you wish

1. Import {useState} from 'react'

2. Create the useState variable

    - initial state will be an empty string

3. Add 'value' field to <form/>

    - set the value to whatever the state is

4. Add 'onChange' function field to <form/>

    - when the search bar value changes, update the State to be that new value

5. Update the handleSearch function to display the State 
   from the search bar when clicked

    - the submit button reloads the page by default
    - e.preventDefault stops the page from always reloading when 
      search bar button is clicked ()

    Now we when type into the search bar and hit enter, it shows the popup
    without reloading the page


## Using State to Display Different Values inside a Component
Timestamp: 44:50

Use the State to conditionally render the MovieCard

    - render MovieCard only if the beginning of the Movie Title begins 
      with the text in the search bar


1. Modify the "movies-grid" <div/> that displays the MovieCards

    - use conditional rendering to render the MovieCard
    - if movie matches && render movie


## Page Routing
Timestamp: 48:10

1. Install the React App Router

`$ npm install react-router-dom`


2. Import and Wrap the <App /> in `main.jsx`
```javascript
import { BrowserRouter } from 'react-dom/router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
)
```

React Router gives you the ability to change components that are being rendered on screen,
based on the slash route (/favorites) for the web page


3. Modify App.jsx to use the Router and define the Paths

Change the return to have a `<main>` container, and wrap and define the Routes
```javascript
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/favorites" element={<Favorites />} />
</Routes>
```

Routes wraps each individual Route
Route contains the Path and which component to render at that Path


4. Create the NavBar component

Use the `<Link />` import from `react-router-dom`

Creates a hyperlink to other pages or sections of the app
```html 
<Link to="/">Text Here</Link> 
```


5. Add Navbar Component to App.jsx

Import it and wrap the entire JSX section in a `<div>`

Add to the top, above `<main>` and `<Routes>`


## CSS Styling
Timestamp: 56:40

1. Create `src/css` directory and add `index.css` & `App.css` to it


2. Create 4 more files in `src/css`, 1 for each component
- MovieCard, Home, Favorites, Navbar


3. Change the imports in `App.jsx` and `main.jsx` so the CSS files point to the new directory
`import './css/App.css'` -> App.jsx & main.jsx


4. Import the corresponding CSS file to each .JSX file
`import ../css/Navbar.css` -> components/Navbar.jsx
`import ../css/Home.css` -> pages/Home.jsx


5. Pull css files from the video's repo

    - had to change a few things to fit the screen (all ./css files are updated)


## Calling APIs
Timestamp: 1:01:00

This will fetching movies from the API rather than hard coding them

Event structure:

    - display a list of movies on Home page
    - use API to get movies
    - use API's search feature and display the results


API: `themoviedb.org`
API Docs: `https://developer.themoviedb.org/reference/intro/getting-started`

    Requires signing up, but it's a free API


1. Create API Key

    - create an account
    - settings -> API
    - Request an API Key

    API Key: <Auth Key given in URL>
    API Read Access Token: <Auth Token given to Request Header>

2. Create a new dir and file `src/services/api.js`

This is a pure javascript file that contains the functions to call the API


3. Get the API Endpoint from the website

    API URL: `https://api.themoviedb.org/3`


4. Start services/api.js by getting API env values

    consts: api_key / api_token & base_url


5. Create function to fetch popular movies 

    * Video uses `API_KEY`, I changed to `API_TOKEN`

    Recommend using API Token in Request Header, not API Key in URL Request
    - Request Header -> Bearer Authorization: API_TOKEN         (preferred)
    - Request URL -> BASE_URL/movie/popular?api_key=API_KEY


    async getPopularMovies()

    - create a const that sets the api token in the header
    - fetch the url endpoint for popular movies
    - return the results


6. Create a function to search for movies

    async searchMovies(query)

    - use encodeURIComponent(query) in the fetch url to transform 
      the query to proper URI formatting
    - `?query=${encodeURIComponent(query)}`
    - return the results


## useEffect
Timestamp: 1:07:20

`useEffect`:

    - allows a task to be run before a component loads
    - can define when you want functions to run

    We only want the API functions run the 1st time the component is rendered


1. Import useEffect & the functions from `api.js`


2. Delete the hard coded movies list


3. Add the movies variable to store it in state

    const [movies, setMovies] = useState([]);

    Anytime the movies list is updated, it will re-render

4. Call useEffect 

    useEffect calls a defined function when a defined variable changes

    useEffect(() => {func}, [empty, values, or state])

    - the dependency array list[] is checked after every render
    - func is called when a value in list[] changes
    - if list[] is empty, it only runs useEffect once at the beginning


5. Create useEffect function

    call getPopularMovies and set the new state


6. Add 2 new state variables 

    error, setError & loading, setLoading

    Common practice when loading something from an API to store the loading state
    & any potential error


7. Add the 2 new state variables into the useEffect function

    Try to fetch API
        - if it fails catch then error 
        - always change the loading state to false after being run

    - try {} -> catch (error) { setError("new value") }
    - finally { setLoading(false) }


8. Call the getPopularMovies function inside useEffect


9. Change MovieCard component to show the movie image

    Change the img src to the correct URL for the movie's poster
    (found in the docs https://developer.themoviedb.org/docs/image-basics)

    poster_path property is returned by calling the Popular Movie API
    (example provided by docs https://developer.themoviedb.org/reference/movie-popular-list)

    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}


10. Display the error state if it occurs

    Use JSX templating to conditionally render the error


11. Display the loading state as its loading

    Use JSX templating to conditionally render either the loading state 
    or the movies list

    - if loading = true, then show loading div
    - else show the movies list
    - this by itself removes the search ability at this point


## Searching
Timestamp: 1:16:50

Adding the conditional render when loading broke searching, so we'll create a dedicated func


1. Modify handleSearch()

    Currently handleSearch just displays what the user types in the search bar

    We want to take that input and use it to call the search API feature

    - if the search bar button is clicked and it's an empty string, do nothing

    - prevent search bar button clicking when already loading

    - set loading to true because we're fetching the API search results

    - try to call the search API and set the movies to display the results,
      and clear any previous error

    - catch, log and return error if fails

    - finally stop loading whether success of failure


3. Check functionality

    The search bar doesn't apply until the search button is hit

    Instead of loading the searched movies in real-time, it waits until clicked

    * Issue: after the search, doesn't go back to home results without reloading



## Contexts
Timestamp: 1:20:10

Our current States in the Home page only apply to that page, and not to Favorites

We want the State to apply to both the Home and Favorites page

    - we need the same State on both pages

    - we want to know what movies are favorited whether we're on Home or Favorites page


When the heart icon is clicked it'll become and stay red

    - even if you come back to the page later


Common Methods are `prop drilling` and `contexts`

`Context` allows State to be globally available to anything thats within the provided context


We'll use 2 features in order to save movies as Favorites: `Local Storage` & `React Context`

`localStorage`:

    Browsers have ~ 5MB of local storage for a website 
    (stored on local machine, not the browser)

`React Context`:

    Provides a way t oshare values like State, functions, and other data
    across the components without manually passing props at every level (prop drilling)

    Useful for theming, managing user auth, or any global state needed by multiple components


1. Create the new `src/contexts/MovieContext.jsx` file and directory

    - this code will provide some global State, and some helper functions
      that can be used from multiple places in the app


2. Import the necessary React hooks

    - createContext, useContext, useEffect, useState


3. Create the starting code

    - instantiate createContext()
    - call useContext() with the new Context


4. Start creating MovieProvider

    - provides State for any components its wrapped around

    - an example is how `<BrowserRouter>` wraps around `<App>` in `main.jsx`


5. Add the `children` prop as the parameter

    - a reserved prop that just means all elements nested inside of the component
    - `<App>` is a child of `<BroswerRouter>`


5. Return the Movie Context Provider

    - wrap MovieContext.Provider around { children }


6. Create the useState values for Favorites

    - this state will be usuable by all MovieContext.Provider's children


7. Create a useEffect function to get Favorites from Local Storage

    - check if any favorited movies are saved to local storage
    - if there are, save them to State

    - local storage stores a list of key:val strings as JSON
    - setFavorites parses the JSON values back into a JS Object


8. Create a useEffect function to save Favorites to Local Storage

    - adds or removes Favorites to/from Local Storage when the Favorites' state changes
      (when a new Favorite is clicked)
    - converts it to JSON for the Local Storage


**3 main operatrions are required:**

    - add to Favorites
    - remove from Favorites
    - check if a movie is Favorited


10. Create addToFavorites function

    - use movie as the parameter

    - you can't just add the movie item into the array 
      (won't actually update the State)

    - need to use setFavorites() function to update the State

    - from within setFavorites, get the previous value (prev) and insert the new movie


11. Create removeFromFavorites function

    - use movieID as parameter

    - get previous contents of Favorites
    - use filter to return all  -movies that do not have the matching movieID


12. Create isFavorite function

    - use movieID as parameter

    - return true or falise if a movie with a matching movieID exists


13. Give the children access to the State and Favorites functions

    - MovieContext.Provider can take a `value` property that contains all funcs 
      to be passed to `{children}`

    - create the Object `value` and add it to the return block

    - now the children have access to the 4 functions

    ```
    const value = {
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    };

    <MovieContext.Provider value={value}>
    ```


## Add Context to App.js
Timestamp: 1:32:50

1. Import MovieProvider


2. In the Return, replace the top-level `<div>` with `<MovieProvider>`

    - this will wrap around all contents in App.jsx


## Allow MovieCard Component to use the new State
Timestamp: 1:33:30

1. Import useMovieContext


2. Call useMovieContext() and save the Is, Add, and Remove functions

    - use variable packing to get `{isFav, addFav, removeFav} = useMovieContext()`

    - this allows you to grab the global state and use it in a component

    - gives us access to the State changes


3. Call isFavorite()

    - will tell us if a movie is favorited or not


4. Update Favorite Button (heart)

    - if favorited, set color to red

    - change the 'favorite-btn' className to a conditional that will include
      an additional className 'active' for the button
      (if favorite, add 'active' tag | .active will be in .css file to apply the style change)


5. Update onFavoriteClick() 

    - add the event as a parameter
    - prevent the default event behavior

    - if movie is favorited, click removes it
    - if movie not favorited, add to favorites


## Allow Favorites Component to use the new State
Timestamp: 1:36:30

Render a grid of favorited movies, only if they exist


1. Import useMovieContext() and MovieCard component



2. Call useMovieContext() to bring in Favorites state (a list)

    - use variable packing/unpacking to grab the values from the context


3. Return the Movies Grid if exists

    - return the same MovieCard element as Home (just copy the 'movies-grid' div)
    - then wrap it in a div and add an `<h2>` header above it


## Finish

The project is completed and works as intended 

    - perform Improvements at top of page

