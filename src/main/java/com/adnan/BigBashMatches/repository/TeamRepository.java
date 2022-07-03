package com.adnan.BigBashMatches.repository;

import org.springframework.data.repository.CrudRepository;

import com.adnan.BigBashMatches.model.Team;

public interface TeamRepository extends CrudRepository<Team, Long> {

    Team findByTeamName(String teamName);

}
  