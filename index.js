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

const body= (next_cursor, has_more, squadBody) =>{
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
                        "contains": `${squadBody}`
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
                        "contains": `${squadBody}`
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

var result_hash_more=true;
var next_cursor='';
let workSquad=[];
let talentSquad=[];
let uggSquad=[];
let genomeSquad=[];


const requestFunction = async( squadBody )=>{
    const resultTemp= await fetch(apiURL, request(body(next_cursor, result_hash_more,squadBody )))
    .then(response => response.json())
    .then(response => {return (response)});
    console.log(100,'cursors? '+resultTemp.has_more);

    if(resultTemp.has_more){
        next_cursor=resultTemp.next_cursor;
        result_hash_more=resultTemp.has_more;
    }else{
        result_hash_more=resultTemp.has_more;
    }
/*     if( squadVar && squadVar.length != 0){
        squadVar = [...squadVar,...resultTemp.results]
    }else{
        squadVar = resultTemp.results
    } */

    
    return resultTemp.results;
    
}



/* for (let i=0; i<listSquads.length;i++){
    
    await requestFunction(listSquads[i]);


    while(result_hash_more!=false){
        await requestFunction();
    
    }
} */
var trigger = true;
const trigger_hash_more = () =>{
    result_hash_more=false;
}

var result;
console.log(listSquads[0])
while(result_hash_more!=false){
    if(trigger){
        trigger_hash_more();
        trigger = false;
    }
    result = await requestFunction(listSquads[0]);
    workSquad = [...workSquad,...result]

}


var counter=0;


console.log(500,workSquad.length);