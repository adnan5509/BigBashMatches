package com.adnan.BigBashMatches.csvInput;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.adnan.BigBashMatches.model.Team;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager entityManager;

    @Autowired
    public JobCompletionNotificationListener(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if (jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            Map<String, Team> teamData = new HashMap<>();

            entityManager.createQuery("SELECT m.team1, count(*) FROM Match m GROUP BY m.team1", Object[].class)
                    .getResultList()
                    .stream()
                    .map(record -> new Team((String) record[0], (long) record[1]))
                    .forEach(team -> teamData.put(team.getTeamName(), team));

            entityManager.createQuery("SELECT m.team2, count(*) FROM Match m GROUP BY m.team2", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(record -> {
                        if (teamData.containsKey((String) record[0])) {
                            Team team = teamData.get((String) record[0]);
                            team.setTotalMatches(team.getTotalMatches() + (long) record[1]);
                        } else {
                            teamData.put((String) record[0], new Team((String) record[0], (long) record[1]));
                        }
                    });

            entityManager
                    .createQuery("SELECT m.matchWinner, count(*) FROM Match m GROUP BY m.matchWinner", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(record -> {
                        Team team = teamData.get((String) record[0]);
                        if (team != null) {
                            team.setTotalWins((long) record[1]);
                        }
                    });

            teamData.values().forEach(team -> entityManager.persist(team));
        }
    }
}
