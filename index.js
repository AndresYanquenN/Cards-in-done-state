import fetch from 'node-fetch'	//npm install node-fetch

const apiURL = "https://api.notion.com/v1/databases/04b356ab699543a7824fef7294344e5b/query";

const listSquads = ['Work squad', 'Talent squad', 'UGG squad', 'Genome squad']

const request = (body) => {
    return {
        method: 'POST',
        headers: {
            'Authorization': ' Bearer secret_6ChP3bBJktR1IwHXAb0q5oJAXhboEJNeQ1lM3vCMnLx',
            'Notion-Version': '2021-05-13',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

const body= (next_cursor, has_more, squad) =>{
    let content =  {
        "filter": {
            "and": [
                {
                    "property": "Stage",
                    "select": {
                        "equals": "✅   Done"
                    }
                },
                {
                    "property": "Squad",
                    "multi_select": {
                        "contains": "Work squad"
                    }
                }
            ]
        }
        
    }

    let contentCursor =  {
        "filter": {
            "and": [
                {
                    "property": "Stage",
                    "select": {
                        "equals": "✅   Done"
                    }
                },
                {
                    "property": "Squad",
                    "multi_select": {
                        "contains": "Work squad"
                    }
                }
            ]
        },
        "start_cursor": `${next_cursor}`
        
    }

    if(has_more){
        return contentCursor;
    }else {
        return content;
    }
}

var result_hash_more=false;
var next_cursor='';
let workSquad=[];


const requestFunction = async()=>{
    const resultTemp= await fetch(apiURL, request(body(next_cursor, result_hash_more)))
    .then(response => response.json())
    .then(response => {return (response)});
    console.log(100,resultTemp.has_more);

    if(resultTemp.has_more){
        next_cursor=resultTemp.next_cursor;
        result_hash_more=resultTemp.has_more;
    }else{
        result_hash_more=resultTemp.has_more;
    }
    
    workSquad = [...workSquad, ...resultTemp.results]
    console.log(workSquad.length)    
    
}

await requestFunction();


while(result_hash_more!=false){
    await requestFunction();

}


var counter=0;


console.log(workSquad.length);