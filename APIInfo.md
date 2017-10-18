DataStructure
-------------------

Schema: 
{
    user:{
        "type":"array"
        "items":[
            {
             "name":{"type":"string"},
             "password":{"type":"string"},
             "id":{"type":"int"}  
            }
        ]
    }
}
Planlegging:{
        "type":"array"
        "items":[
            {
             "ToBeDone":{"type":"string"},
             "Doing":{"type":"string"},
             "description":{"type":"string"}
            }
        ]
    }


Example: 
{
    user:[
        {"name":"ExampleName", "password":"ExamplePassword", "id":"Example1"}
    ]
}
{
    Planlegging:[
        {"ToBeDone":"Array of items", "Doing":"Array of items", "description":"Example description"}
    ]
}