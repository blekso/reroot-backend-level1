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

Query Parameters:
```
  completed: boolean;
  expired: boolean;
  get_productivity_ratio: boolean;
```
Completed - selects tasks with completed field set to same value\
Expired - calculates which tasks' dueDates are in the past time\
GetProductivityRatio - returns the ratio of completed tasks in their dueDate\
Values of query have to be used in url and are required and have to be combined!\

Route example: 
```
localhost:3000/api/ratios?completed=false&expired=false&get_productivity_ratio=false
```

#### /api/tasks GET

Query Parameters:
```
  completed: boolean,
  sort_by_date: string (desc or asc);
  page: number (0, 1, 2..);
  filter_by_title: string
```
Completed - selects tasks with completed field set to same value\
SortByDate - sorts tasks by their dueDates\
Page - pagination of 5 tasks per page\
FilterByTitle - filtering by name with LIKE %name% operator\
Values of query have to be used in url query and are all required except filter_by_title, others have to be combined!\

Route example: 
```
localhost:3000/api/tasks?completed=false&sort_by_date=desc&page=0&filter_by_title=zadatak1
```

#### /api/tasks POST

Filter Parameters (body):
```
{
  title: string;
  dueDate: string (year-mm-dd);
  completed: boolean
}
```
Creates new task, all fields are required in req.body.\

Object example:
```
{
  "title": "title",
  "dueDate": "2022-05-21",
  "completed": false
}
```

#### /api/tasks PUT

Filter Parameters (body):
```
{
  title: string;
  dueDate: string (year-mm-dd);
  completed: boolean
}
```
Updates fields which are set in req.body to the task with the same ID as in req.params.id\
Requires /:id as req.params.id\
Atleast one field is needed in order to update the task successfully!\

Route & Object example:
```
localhost:3000/api/tasks/14
```
```
{
  "title": "title",
  "dueDate": "2022-05-21",
  "completed": false
}
```

#### /api/tasks DELETE

Deletes task from table, requires /:id in req.params.id\

Route example: 
```
localhost:3000/api/tasks/14
```

### Author

Mihael Ištvan
