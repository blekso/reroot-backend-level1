# Reroot backend task level 1 

### Description
Before running the project user needs to have MySql Workbench installed with appropriate relations configured, Postman for API calls.

### Configuring MySql Workbench

Open MySql Workbench and on the navigator on the left-hand side switch from "Administration" to "Schemas", then right click on the blank space in the navigator and click "Create Schema". In my case, schema is called "reroot-app". Upon creating the schema, set the schema as the default schema by right clicking on it and selecting "Set as Default Schema". After that create a table in that schema by right clicking on tables inside schema and clicking "Create Table". Table should have a name that resembles what contains so I named it "tasks" as it contains tasks. Each task should have a primary key field "id" which is set as PK (primary key), NN (not null), UQ(unique) and AI(auto increment). Other fields should be "title" as VARCHAR(100), "dueDate" as DATE and "completed" as BOOLEAN or TINYINT(1). 

### Configuring .env file

Env file is used to store environment variables used in the project. DB_HOST=localhost ; since we use MySql Workbench locally, DB_USER=root ; name of the user in MySql Workbench, DB_NAME=reroot-app ; name of the schema in MySql Workbench and DB_PASSWORD=password ; password of the user. NODE_ENV=development and PORT=3000. These values can be set to any other values. 

### Installing

```
npm i
```

### Run the program

Run dev version
```
npm run dev
```

Build typescript files from /src to /dist
```
npm run build
```

Run build /dist version
```
npm run start
```

### App description

App uses two main routes: /api/ratios (localhost:3000/api/ratios) which returns ratios of tasks and /api/tasks (localhost:3000/api/tasks) which returns task objects.

#### /api/ratios GET
```
{
  "completed": false,
  "expired": false,
  "get_productivity_ratio": false
}
```
Completed: boolean - selects tasks with completed field set to same value\
Expired: boolean - calculates which tasks' dueDates are in the past time\
GetProductivityRatio: boolean - returns the ratio of completed tasks in their dueDate\
Values of fields are required and have to be combined!

#### /api/tasks GET
```
{
  "completed": false,
  "sort_by_date": "desc",
  "page": 0,
  "filter_by_title": ""
}
```
Completed: boolean - selects tasks with completed field set to same value\
SortByDate: string (desc/asc) - sorts tasks by their dueDates\
Page: number - pagination of 5 tasks per page\
FilterByTitle: string - filtering by name with LIKE %name% operator\
Values of fields are required and have to be combined!

#### /api/tasks POST
```
{
  "title": "title",
  "dueDate": "2022-05-21",
  "completed": false
}
```
Creates new task, all fields are required.  

#### /api/tasks PUT
```
/:id
{
  "title": "zad4",
  "dueDate": "2022-05-21",
  "completed": false,
}
```
Updates fields which are set in req.body to the task with the same ID as in req.params.id\
Requires /:id as req.params.id\
Atleast one field is needed in order to update the task successfully!

#### /api/tasks DELETE
Deletes task from table, requires /:id as req.params.id

### Author

Mihael Ištvan
