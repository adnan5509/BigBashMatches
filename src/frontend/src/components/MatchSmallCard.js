import { React } from 'react';
import { Link } from 'react-router-dom';
import "./MatchSmallCard.scss"

export const MatchSmallCard = ({ teamName, match }) => {
    if (!match) return null;
    const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    const isMatchWon = teamName === match.matchWinner;
    return (
        <div className={isMatchWon ? 'MatchSmallCard match-won-card' : 'MatchSmallCard match-lost-card'}>
            <span className='small-vs'>vs</span>
            <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
            <h4 className='match-result-card'>{match.matchWinner} won by {match.resultMargin} {match.result}</h4>
        </div>
    );
}

