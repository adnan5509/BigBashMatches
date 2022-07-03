package com.adnan.BigBashMatches.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.adnan.BigBashMatches.model.Match;

public interface MatchRepository extends CrudRepository<Match, Long> {

    List<Match> findByTeam1OrTeam2OrderByDateDesc(String teamName1, String teamName2, Pageable pageable);

    default List<Match> getTeamLatestMatches(String teamName, int count) {
        return findByTeam1OrTeam2OrderByDateDesc(teamName, teamName, PageRequest.of(0, count));
    }
}
