import { React } from 'react';
import { Link } from 'react-router-dom';
import "./MatchDetailCard.scss"

export const MatchDetailCard = ({ teamName, match }) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === match.matchWinner;
    return (
        <div className={isMatchWon ? 'MatchDetailCard match-won-card' : 'MatchDetailCard match-lost-card'}>
            <div className='match-details'>
                <span className='vs'>vs</span>
                <h2><Link to={otherTeamRoute}>{otherTeam}</Link></h2>
                <h3 className='match-date'>{match.date}</h3>
                <h4 className='match-venue'>at {match.venue}</h4>
                <h4 className='match-result'>{match.matchWinner} won by {match.resultMargin} {match.result}</h4>
            </div>
            <div className='additional-match-details'>
                <h3>First Innings</h3>
                <p className='match-first-innings'>{match.team1}</p>
                <h3>Second Innings</h3>
                <p className='match-second-innings'>{match.team2}</p>
                <h3>Player of the Match</h3>
                <p className='match-pom'>{match.playerOfMatch}</p>
                <h3>Umpires</h3>
                <p className='match-umpires'>{match.umpire1}, {match.umpire2} </p>
            </div>
        </div>
    );
}

