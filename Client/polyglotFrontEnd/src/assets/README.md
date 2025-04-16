src/
├── api/
│   └── languages.js
├── data/
│   ├── VowelTableScript.jsx
│   └── ConsonantTableScript.jsx
├── languages/
│   ├── AddLanguage.jsx
│   ├── EditLanguage.jsx
│   ├── MyLanguages.jsx
│   └── ViewLanguage.jsx
├── users/
│   ├── AddProfile.jsx
│   ├── EditProfile.jsx
│   └── ViewProfile.jsx
├── pages/
│   ├── Home.jsx
│   ├── LoginPage.jsx
│   ├── CallbackPage.jsx
│   └── Compare.jsx
├── security/
│   ├── AuthContext.jsx
│   └── ProtectedRoute.jsx

# Polyglot Language App

Polyglot is a full-stack web application that allows users to create, view, and comment on custom languages using detailed vowel and consonant charts. It supports public and private entries, user authentication, and comment management.

## Tech Stack

### Frontend:
- React
- Bootstrap
- Axios
- React Router
- Font Awesome

### Backend:
- Java Spring Boot
- JPA/Hibernate
- MySQL
- Spring Security

##  How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/polyglot.git
cd polyglot
```

### 2. Setup the Backend
```bash
cd API/polyglot
./gradlew bootRun
```

> Make sure your MySQL DB is running and credentials match `application.properties`

### 3. Setup the Frontend
```bash
cd frontend/polyglot
npm install
npm run dev
```

> Open the app at [http://localhost:5173](http://localhost:5173)

##  Folder Structure

```bash
polyglot/
│
├── API/polyglot/          # Spring Boot backend
│   ├── models/
│   ├── controllers/
│   ├── repositories/
│   └── PolyglotApplication.java
│
├── frontend/polyglot/     # React frontend
│   ├── src/
│   │   ├── languages/
│   │   ├── security/
│   │   └── App.jsx
│   └── public/
```

##  Team

This app was created by **Code-Cobras** for the LaunchCode Liftoff program.

- Hamida - Database Engineer
- julie - CRUD Master
- Colleen - External API
- Prinsha - Authontication 

##  License

This project is licensed under the MIT License.