package com.adnan.BigBashMatches.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.adnan.BigBashMatches.model.Match;
import com.adnan.BigBashMatches.model.Team;
import com.adnan.BigBashMatches.repository.MatchRepository;
import com.adnan.BigBashMatches.repository.TeamRepository;

@RestController
@RequestMapping("/bbl")
@CrossOrigin
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable(name = "teamName") String teamName) {
        Team team = teamRepository.findByTeamName(teamName);
        List<Match> teanMatches = matchRepository.getTeamLatestMatches(teamName, 4);
        team.setTeamMatches(teanMatches);

        return team;
    }

    @GetMapping("/team/{teamName}/matches")
    public List<Match> getTeamMatchesByYear(@PathVariable(name = "teamName") String teamName,
            @RequestParam(name = "year") int year) {

        LocalDate startDate = LocalDate.of(year, 1, 1);
        LocalDate endDate = LocalDate.of(year + 1, 1, 1);
        // return matchRepository.findByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(teamName,startDate,endDate,teamName,startDate,endDate);

        return matchRepository.getTeamMatchesByYear(teamName,startDate,endDate);

    }
}
