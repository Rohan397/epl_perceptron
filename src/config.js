require('dotenv').config();

export const BASE_URL = process.env.BASE_URL
export const SCORE_URL = process.env.SCORE_URL
export const TEAMS_PATH = process.env.TEAMS_PATH
export const PATH_INDEX = process.env.PATH_INDEX

export const START_KEYWORDS = ['Possession%', 'Totalshots','Ontarget', 'Offtarget', 'Blocked',
'Passing%', 'Attacking3rd%', 'KeyPasses', 'Clear-CutChances', 'Crosses%',  'Dribbles%',
'Corners', 'Offsides', 'Recoveries', 'Tackles%', 'Interceptions', 'Blocks', 'Clearance',
'HeadedClearances', 'AerialDuels%', 'BlockedCrosses', 'Saves', 'Catches', 'FoulsCommitted',
'FoulsWon','YellowCards', 'RedCards' ];
export const STOP_KEYWORDS = ['Shots','Ontarget', 'Offtarget', 'Blockedhome', 'PassesPassing%',  'Attacking',
'KeyPasses', 'Attack', 'Crosses%', 'Dribbles', 'Corners', 'Offsides', 'Recoveries',
'Defence', 'Interceptions', 'Blocks', 'Clearances', 'HeadedClearance', 'AerialDuels',
'BlockedCrosses', 'Goalkeeping', 'Catches', 'Discipline', 'FoulsWon',
'YellowCards', 'RedCards', 'Matches' ];
