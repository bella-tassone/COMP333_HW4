# COMP333_HW4

## How to Run our App

Before attempting to run the app, please make sure that you have XAMPP installed and running. Within the myphpAdmin backend, you should create a database with both a users and ratings table. You can run the commands below to do so.

```sql
CREATE DATABASE music_db;
USE music_db;
CREATE TABLE users (username VARCHAR(255) PRIMARY KEY, password VARCHAR(255));
CREATE TABLE ratings (id INT(11) PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    artist VARCHAR(255),
    song VARCHAR(255),
    rating INT(1) CHECK (rating BETWEEN 1 AND 5),
    FOREIGN KEY (username) REFERENCES users(username)
     );
```

Similarly, make sure that you have [Android Studio](https://developer.android.com/studio) installed, and an [Android Virtual Device (AVD)](https://developer.android.com/studio/run/managing-avds) created on it. We use a Pixel 5 API 31.

<img width="572" alt="Screenshot 2023-11-12 at 10 37 26 PM" src="https://github.com/bella-tassone/COMP333_HW4/assets/54873610/0c21c168-5b7c-4e27-a6cb-0797729e3c73">

You will want to make sure that you have installed node.js and npm. You can get node.js by first installing [homebrew](https://brew.sh/) and then running the command `brew install node`. You can simply install npm by running `npm install`.

1. Clone this repository into your preferred directory. You may do so with the command `git clone https://github.com/bella-tassone/COMP333_HW4.git`.

2. You will want to alter the contents of COMP333_HW4/Backend/inc/config.php to match your database credentials. Here is what ours looks like, for reference.

```php
<?php
define("DB_HOST", "localhost");
define("DB_USERNAME", "root");
define("DB_PASSWORD", "");
define("DB_DATABASE_NAME", "music_db");
?>
```

3. Copy the contents of the Backend folder (Controller/Api, Model, inc, index.php) into the htdocs folder of your XXAMP application.

4. Use the `cd` command in your terminal to navigate into COMP333_HW3/Frontend/react-mobile-fe. This is where you'll start the react-native app.

5. You will need to change the IP addresses within the Frontend to match your own. You can find your own IP address by going into Wifi Settings -> Details. You will need to replace the given IP address with your own in the following files: `Home.js`, `Login.js`, `Registration.js`, `SearchResults.js`, `UserDetails.js`. We have left comments to help direct what needs to be replaced.

6. In our app, we have various resources installed (reactstrap, icons, etc). They should already be contained within the repository, but if you want to confirm that everything is up-to-date, take a look at the following websites: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/install), [Fontawesome Icons](https://fontawesome.com/docs/web/use-with/react-native), [React Native Navigation](https://reactnative.dev/docs/navigation) (which you can install by running `npm install @react-navigation/native @react-navigation/stack` and then `expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`), and [Axios](https://www.npmjs.com/package/react-native-axios) (which you can install by running `npm install axios`). The other links should easily explain how to install and use their various resources.

7. Run your AVD from Android Studio's Virtual Device Manager. An android phone should appear and start up on your screen.

8. Finally, within the `react-mobile-fe` directory, run the command `npx expo start`. You may then have to type `a` into the running terminal in order to open the app on your android device. The app should open momentarily, and you should be directed to the home ratings page.

**Note**: If your app does not appear connected on the AVD (perhaps you see a warning that says "Cannot connect to Metro"), click `Cmd-M` while you have the AVD selected and then select `Reload`.

## File Directory

- `.gitignore`
- `LICENSE`
- `README.md`

### Backend

- `index.php`: Used to create controller instances, and contains the logic for calling action functions in the user and rating controllers

#### Controller/Api

- `BaseController.php`: Contains basic logic used in user and rating controllers via function call
- `RatingController.php`: Contains the get, create, update, and delete actions for /ratings API calls
- `UserController.php`: Contains the get, create, and login actions for /user API calls

#### Model

- `Database.php`: Basic wrapper for interacting with the SQL database, and provides methods for performing CRUD operations
- `UserModel.php`: Holds SQL queries in functions called in the userController and returns data from the SQL database to be processed into the view (frontend)
- `RatingModel.php`: Holds SQL queries in functions called in the ratingController and returns data from the SQL database to be processed into the view (frontend)

#### inc

- `bootstrap.php`: Contains paths for the controllers and models to be referenced throughout the backend code files
- `config.php`: Contains specifics relating to establishing database connection

### Frontend/react-mobile-fe

For brevity, we will only go over files that have been actively worked on.

- `package.json`
- `package-lock.json`
- `babel.config.js`
- `app.json`
- `node_modules` (folder)
- `assets` (folder)
- `App.js`: Main component of app, handles page navigation set-up.
- `Home.js`: Home page logic and API integration. From here, users can login, logout, view the total ratings list, and view individual ratings. If logged in, users can also add ratings from this page.
- `ViewDetails.js`: Logic for viewing an individual rating. If it's the user's own rating, they can also update and/or delete the rating from this page.
- `AddRating.js`: Logic and API integration for adding a rating onto the Home page
- `UpdateRating.js`: Logic and API integration for changing a rating on Home page (only rating itself can be changed, and must be user's own rating).
- `DeleteRating.js`: Logic and API integration for deleting a rating from Home page (must be user's own rating).
- `Login.js`: Login form component and API integration for user login
- `LogOut.js`: Simple form that handles user log out.
- `Registration.js`: Registration form component and API integration for user login
- `SearchResults.js`: Logic and API integration for displaying results from user filter search on home page.
- `UserDetails.js`: Logic and API integration for displaying any given user's ratings list.

#### Additional Feature

- `User Filter`: We have implemented a user filter on the Home page. Upon entering a string in the search bar, a list of all users in the database that match will be shown. For instance, if `b` is entered in the search bar, then upon submission both `bella` and `brandon` could be shown as results. However, if `be` is entered, then only `bella` would show as a result. Click on any user given in the search results to see their personal ratings list.

Developers🧑‍🔬:
Bella Tassone and Nate Levinson

**NOTE**: In our updating ratings page, users are only allowed to change the rating of any given entry (not song or artist). This is what made most sense to us, as a user should never need to edit a song and artist, considering they already have the ability to add new entries and delete current ones. We talked to Sebastian about this and got the OK to go ahead with it!
