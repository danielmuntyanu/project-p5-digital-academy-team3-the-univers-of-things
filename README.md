# Nexus Anime (The Universe Of Things)

## Description

Website preview link: [Nexus Anime](https://factoriaf5-asturias.github.io/project-p5-digital-academy-team3-the-univers-of-things/)
<br>

### About the project
This is a web application that allows users to browse and manage anime. It provides an interface for soerch and save them to favorites, viewing details of existing ones. Also it has authentification and registration features. As admin you can also watch all the users and add them to blacklist. Every user can change their avatar, name or password in personal settings page. And also it has a user dashboard with a list of favorite animes.

### Stack
- Vue.js
- Jikan API
- Vue Router
- Vue Pinia
- Vite
- Tailwind CSS
- Firebase Authentication
- Firebase Firestore
- Cloudinary
- Vitest
- Playwright
- GitHub Pages

### Features
- Search anime by name
- Filter by genre
- Save anime to favorites
- View anime details
- User dashboard
- Admin dashboard
- Login and register
- Change user avatar, name or password
- Blacklist users

<br>
<br>
<br>



## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```
<br>
<br>
<br>

## Prototypes (Stitch & Figma)

<br>

### Home Page:

<img 
    width="1284" height="2840" alt="Nexus Anime - Homepage" 
    src="./docs/prototype/home.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<br>

### Datailed View:

<img 
    width="1310" height="3139" alt="Nexus Anime - Anime Details" 
    src="./docs/prototype/detail.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    " 
/>

<br>

### Header:

<img 
    width="1340" height="140" alt="TopNavBar" 
    src="./docs/prototype/header.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    " 
/>

<br>

### Sign In:

<img 
    width="1280" height="1024" alt="Nexus Anime - Access" 
    src="./docs/prototype/login-page.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<br>

### Create Account:

<img 
    width="1280" height="1034" 
    alt="Nexus Anime - Create Account (Email Validation" 
    src="./docs/prototype/register-page.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<br>

### User Dashboard and Settings:

<img 
    width="1300" height="1064" 
    alt="Nexus Anime - Add Anime Modal" 
    src="./docs/prototype/user-dashboard.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<br>

### Admin Dashboard:

<img 
    width="1300" height="1328" 
    alt="Nexus Anime - Admin Panel" 
    src="./docs/prototype/admin-dashboard.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


## UserFlow

<img 
    width="1290" height="1225" 
    alt="Nexus Anime - Homepage" 
    src="./docs/userflow/UserFlow-Guest.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<img 
    width="1290" height="836" 
    alt="Nexus Anime - Homepage" 
    src="./docs/userflow/UserFlow-Customer.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<img 
    width="1290" height="895" 
    alt="Nexus Anime - Homepage" 
    src="./docs/userflow/UserFlow-Admin.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>



## Planning (Jira)

### Methodology
- SCRUM
- User Stories
- Acceptance Criteria
- 2-week Sprints

### Timeline
<img 
    width="1646" height="1196" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/timeline.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

### Planning style
<img 
    width="1601" height="813" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/planning-style.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

### Backlog of sprint 2
<img 
    width="1601" height="813" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/backlog.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

## User Stories and Acceptance Criteria

<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-1.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-2.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-3.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-4.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-5.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-6.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-7.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-8.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-9.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-10.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-11.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-12.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-13.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-14.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-15.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-16.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>


<img 
    width="1284" height="800" 
    alt="Nexus Anime - Homepage" 
    src="./docs/planning/us-17.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

<br>

## Testing

### Unit Tests by Vitest

<img 
    width="1300" height="2000" 
    alt="Nexus Anime - Homepage" 
    src="./docs/testing/unit.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>

### e2e tests by Playwright

<img 
    width="1300" height="850" 
    alt="Nexus Anime - Homepage" 
    src="./docs/testing/e2e.png" 
    style="
        border: 1px solid #ccc; 
        border-radius: 15px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    "
/>
<br><br>

## Autors

- Danyil Muntianu ([GitHub](https://github.com/danielmuntyanu))
- Jose Ángel Peña Díaz ([GitHub](https://github.com/joseang1))
- Iker Arduengo Díaz ([GitHub](https://github.com/ikerardi-dev))


