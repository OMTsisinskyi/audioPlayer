
## 1. Clone the Repository

```bash
git clone https://github.com/OMTsisinskyi/audioPlayer.git
```
---
## 2. Backend Setup

>Before starting the backend, make sure you have a PostgreSQL database set up.
#### 1. Navigate to the backend folder
#### 2. Create the PostgreSQL Database: Ensure that you have a PostgreSQL instance running and create a new database for the project.
#### 3. Set up Database Connection: In the backend, you'll need to set up the database connection URL. Create a .env file in the backend directory, and add the following line:
>Replace {username}, {password}, and {db_name} with your actual database credentials.
```bash
DATABASE_URL=postgresql://{username}:{password}@localhost:5432/{db_name}?schema=public
```

#### 4. Install Dependencies
```bash
npm install

```
#### 5. Run the following command to generate the Prisma client:
```bash
npx prisma migrate dev
```

#### 6. Start the Backend
```bash
npm run dev

```
---
## 3. Frontend Setup
#### 1. Navigate to the frontend folder
#### 2. Install Dependencies
```bash
npm install

```
#### 3. Start the Frontend
```bash
npm run dev

```