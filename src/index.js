import {
  BASE_URL,
  SCORE_URL,
  TEAMS_PATH,
  PATH_INDEX,
  START_KEYWORDS,
  STOP_KEYWORDS,
} from './config' ;

var  request = require('request')
var fs = require('fs')


async function main()  {
  let page_no = await get_path_index()
  page_no = Number(page_no)

  for (let i = 0; i < 10; i++){
    page_no += 1
    let teams = await getBasicInfo(page_no)
    await getGameStats(page_no, teams)
  }
  write_game_no(page_no)
}

function write_game_no(page_no){
  fs.writeFile(PATH_INDEX, page_no, (err) =>{
    if (err != null){
      print("ERROR  WRITING NEW PAGE_NO")
    }
  })
}


function getBasicInfo(page_no) {
  return new Promise(async (resolve, reject) => {
    request.get({
      url: SCORE_URL + page_no},
      async (err, res, body) =>  {
        if (err != null){
          reject('error pulling basic info', err)
        }
      let processing = res.body.replace(/<(?:.|\n)*?>/gm, '').replace(/\s/g, '')
      let score = processing.match(/(.*?)(?=MatchReport)/)
      if (score == null){
        write_page_no(page_no)
        throw new Error("Err getting basic info for match ",page_no )
      }
      let teams_arr = await(game_info(score[0]))
      resolve(teams_arr)
      })
  })
}

function getGameStats(page_no, teams) {
  request.get({
    url: BASE_URL + page_no},
    async function(error, response, body){
      console.log("ERROR HERE:", error)
      let raw_info = response.body
      let processed_info = raw_info.replace(/<(?:.|\n)*?>/gm, '').replace(/\s/g, '')
      let finding_data = processed_info.match(/(FT)(.*?)(WatchwithApp)/m)
      await parse_string(processed_info, teams)
  })


}



function game_info(txt){
  return new Promise((resolve, reject)=> {
    console.log("in game_info")
    let home_result = '0'
    let away_result = '0'
    let home_team = txt.match(/(.*?)(?=[0-9])/)[0]
    let home_goals = new RegExp('(?<=' + home_team + ')(.)')
    home_goals = Number(txt.match(home_goals)[0])
    let away_team = txt.match(/(?<=-[0-9])(.*?)(?=-)/)[0]
    let away_goals = new RegExp('(.)(?=' + away_team + ')')
    away_goals = Number(txt.match(away_goals)[0])
    if (away_goals > home_goals){
      away_result = '1'
    } else if (away_goals < home_goals){
      home_result = '1'
    }
    updateFileData(home_team, home_result, 'results')
    updateFileData(away_team, away_result, 'results')
    resolve([home_team, away_team])
  })
}

  async function  updateFileData(team, data, file_path){
    data = data + '\n'
    fs.appendFile(TEAMS_PATH + team +'/' + file_path, data,  (err)  =>  {
      if (err)  {throw err}
    })
  }

 function parse_string(raw_text, teams){
  console.log("in parse_string")
  let stat
  let away  = [];
  let home  = [];

  for (let i =0; i < START_KEYWORDS.length; i++){
    let regex = new  RegExp('(?<='+ START_KEYWORDS[i] +')(.*?)(?='+ STOP_KEYWORDS[i] +')','m')
    stat = raw_text.match(regex);
  try {
    home.push(stat[0].match(/(?<=home)(.*)(?=away)/)[0])
    away.push(stat[0].match(/(?<=away)(.*)/)[0])
  }
  catch (err){
    throw new Error("Error compiling data for ", teams)
  }

  }
  updateFileData(teams[0],home,'game_data')
  updateFileData(teams[1], away, 'game_data')
}


async function get_path_index(){
  console.log("in get_path_index")
  return new Promise(async (resolve, reject)=> {
    fs.readFile(PATH_INDEX, 'utf8', function(err, data){
      if (err != null){
      reject("Problem reading path_index.txt:  ", err)
      }
      resolve(data)
    })
  })
}

main()
