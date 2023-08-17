# Bookstore-Assessment

This is an Assessment Project that was assigned to me during an internship interview. Note that this project has a lot of areas for improvements both in code structure and website design, I took this project as an apportunity to get familiar with Angular's capabilities and sat out to do it using exclusively the Angular router to eliminate page refreshes. I am aware of the lack of both confirmation popup messages in the UX design and strict code functionality-based structure.
## Set Up

### Environmental Variables
1. Create a `.env` file in the `Backend` folder, following the format provided in [env_example.txt](Backend/env_example.txt).
2. Create a `environment.prod.ts` file in the [Frontend Evironments Folder](Frontend/src/environments), following the format provided in [environment.prod.ts_example.txt](Frontend/src/environments/environment.prod.ts_example.txt)

### Database
1. Create a MongoDB server.
2. Link the server link to the NodeJs Backend by using the DB URL value in the `.env` you created.
3. Pass the host of the NodeJS to `environment.prod.ts` but make sure to accompany it with `/api` for example if you're using localhost the apiUrl will be
   ```shell
   apiUrl: 'http://localhost:PORT/api'
   ```
4. Import the data from the provided email.

### Packages
1. Requires Node Package Manager (NPM).
2. Open your project in a terminal.
3. Navigate to the `Backend` folder.
4. Run the following command to install the required packages:
   ```shell
   npm install
   ```
5. Open a second terminal.
6. Navigate to the `Frontend` folder.
7. Run the same command to install packages:
   ```shell
   npm install
   ```

### Running the Server
1. In the first terminal (Backend), run the following command:
   ```shell
   npm start
   ```
2. In the second terminal (Frontend), run the following command:
   ```shell
   ng build
   ```

## Version
Please note that this project was developed using the following versions, and hasn't been tested for compatibility with any other versions:
- Node Package Manager (NPM): 9.8.1
- Angular: 16.1.8
