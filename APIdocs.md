# APIdocs

## POST: /API/register
#### Description
Add a new user
#### Body
```
{
  username: String,
  password: String
}
```
#### Response
```
{
  success: Boolean
}
```

## POST: /API/login
#### Description
Authenticate user and get token
#### Body
```
{
  username: String,
  password: String
}
```
#### Response
```
{
  success: Boolean,
  token: String
}
```

## All routes below requires authetication headers
```
{
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer <jwttoken>'
  }
}
```

## GET: /API/boards
#### Description
Get all boards for authenticated user
#### Response
```
{
  boards: [{
    id: Number,
    name: String,
    description: String,
    username: String,
    data_created: Date
  }]
}
```

## POST: /API/boards
#### Description
Create new board for authenticated user
#### Body
```
{
  name: String,
  description: String
}
```
#### Response
```
{
  id: Number
}
```

## GET: /API/boards/:id
#### Description
Get a specific board
#### Response
```
{
  boards: [{
    boardid: Number,
    boardname: String,
    username: String,
    listid: Number,
    listname: String,
    deadline: Date,
    todoid: Number,
    text: String,
    done: Boolean
  }]
}
```

## DELETE: /API/boards/:id
#### Description
Delete a specific board
#### Response
```
{
  id: Number
}
```

## POST: /API/lists
#### Description
Create new list
#### Body
```
{
  name: String,
  board_id: Number,
  deadline: Date
}
```
#### Response
```
{
  list: {
    name: String,
    board_id: Number,
    deadline: Date
  }
}
```

## DELETE: /API/lists/:id
#### Description
Delete a specific list
#### Response
```
{
  id: Number
}
```

## POST: /API/todos
#### Description
Create a new todo
#### Body
```
{
  text: String,
  listid: Number
}
```
#### Response
```
{
  todo: {
    text: String,
    listid: Number,
    done: Boolean
  }
}
```

## PUT: /API/todos/:id
#### Description
Set todo state
#### Body
```
{
  done: Boolean
}
```
