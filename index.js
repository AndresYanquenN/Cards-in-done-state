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
const pull_request_merged ="📦 Pull request merged" 
const pull_request ="🧐  Pull request"; 
const done ="✅   Done"; 
const optimization_analysis ="🏃 Optimization analysis";
const feature_flag_release="🚩 Feature flag release";

const body= (next_cursor, has_more, squadBody, bugOrDone) =>{
    let content =  {
        "filter": {
            "and": [
                {
                    "property": "Stage",
                    "select": {
                        "equals": `${bugOrDone}`
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
                        "equals": `${bugOrDone}`
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



console.log(done);
const requestFunction = async( squadBody, bugOrDone )=>{
    const resultTemp= await fetch(apiURL, request(body(next_cursor, result_hash_more,squadBody,bugOrDone )))
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


var result;
var trigger = true;
const trigger_hash_more = (props) =>{
    if(props){
        result_hash_more=true;
        trigger=true;
    }else{
        result_hash_more=false;
    }
}

var result_hash_more=true;
var next_cursor='';
let workSquadDone=[];
let talentSquadDone=[];
let uggSquadDone=[];
let genomeSquadDone=[];

var SquadsDone = [workSquadDone, talentSquadDone, uggSquadDone, genomeSquadDone]

let workSquadPullRequest=[];
let talentSquadPullRequest=[];
let uggSquadPullRequest=[];
let genomeSquadPullRequest=[];

var SquadsPullRequest = [workSquadPullRequest, talentSquadPullRequest, uggSquadPullRequest, genomeSquadPullRequest]

let workSquadPullRequestMerge=[];
let talentSquadPullRequestMerge=[];
let uggSquadPullRequestMerge=[];
let genomeSquadPullRequestMerge=[];

var SquadsPullRequestMerge = [workSquadPullRequestMerge, talentSquadPullRequestMerge, uggSquadPullRequestMerge, genomeSquadPullRequestMerge]

let workSquadFeatureFlagRelease=[];
let talentSquadFeatureFlagRelease=[];
let uggSquadFeatureFlagRelease=[];
let genomeSquadFeatureFlagRelease=[];

var SquadsFeatureFlagRelease = [workSquadFeatureFlagRelease, talentSquadFeatureFlagRelease, uggSquadFeatureFlagRelease, genomeSquadFeatureFlagRelease]

optimization_analysis

let workSquadOptimization_analysis=[];
let talentSquadOptimization_analysis=[];
let uggSquadOptimization_analysis=[];
let genomeSquadOptimization_analysis=[];

var SquadsOptimization_analysis = [workSquadOptimization_analysis, talentSquadOptimization_analysis, uggSquadOptimization_analysis, genomeSquadOptimization_analysis]




console.log(done);
console.log("Cards en ---------------------------------- done");

for (let i=0; i<listSquads.length;i++){
    console.log("Current Squad: "+listSquads[i])
    trigger_hash_more(true);
    while(result_hash_more!=false){
        if(trigger){
            trigger_hash_more(false);
            trigger = false;
        }
        result = await requestFunction(listSquads[i], done);
        SquadsDone[i] = [...SquadsDone[i],...result]
    
    }
    console.log(500,SquadsDone[i].length);
} 

console.log(pull_request);
console.log("Cards en ---------------------------------- pullrequest");

for (let i=0; i<listSquads.length;i++){
    console.log("Current Squad: "+listSquads[i])
    trigger_hash_more(true);
    while(result_hash_more!=false){
        if(trigger){
            trigger_hash_more(false);
            trigger = false;
        }
        result = await requestFunction(listSquads[i], pull_request);
        SquadsPullRequest[i] = [...SquadsPullRequest[i],...result]
    
    }
    console.log(500,SquadsPullRequest[i].length);
} 

console.log(pull_request_merged);
console.log("Cards en ---------------------------------- pullrequestMerge");

for (let i=0; i<listSquads.length;i++){
    console.log("Current Squad: "+listSquads[i])
    trigger_hash_more(true);
    while(result_hash_more!=false){
        if(trigger){
            trigger_hash_more(false);
            trigger = false;
        }
        result = await requestFunction(listSquads[i], pull_request_merged);
        SquadsPullRequestMerge[i] = [...SquadsPullRequestMerge[i],...result]
    
    }
    console.log(500,SquadsPullRequestMerge[i].length);
} 

console.log(feature_flag_release);
console.log("Cards en ---------------------------------- feature_flag_release");


for (let i=0; i<listSquads.length;i++){
    console.log("Current Squad: "+listSquads[i])
    trigger_hash_more(true);
    while(result_hash_more!=false){
        if(trigger){
            trigger_hash_more(false);
            trigger = false;
        }
        result = await requestFunction(listSquads[i], feature_flag_release);
        SquadsFeatureFlagRelease[i] = [...SquadsFeatureFlagRelease[i],...result]
    
    }
    console.log(500,SquadsFeatureFlagRelease[i].length);
} 

console.log(optimization_analysis);
console.log("Cards en ---------------------------------- optimization analysis");

for (let i=0; i<listSquads.length;i++){
    console.log("Current Squad: "+listSquads[i])
    trigger_hash_more(true);
    while(result_hash_more!=false){
        if(trigger){
            trigger_hash_more(false);
            trigger = false;
        }
        result = await requestFunction(listSquads[i], feature_flag_release);
        SquadsOptimization_analysis[i] = [...SquadsOptimization_analysis[i],...result]
    
    }
    console.log(500,SquadsOptimization_analysis[i].length);
} 







/* while(result_hash_more!=false){
    if(trigger){
        trigger_hash_more();
        trigger = false;
    }
    result = await requestFunction(listSquads[0]);
    workSquad = [...workSquad,...result]

} */





