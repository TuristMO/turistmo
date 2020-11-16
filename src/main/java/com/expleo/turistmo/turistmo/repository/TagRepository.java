package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Application;
import com.expleo.turistmo.turistmo.domain.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

    @Query("SELECT a FROM Tag a WHERE LOWER(a.title) like LOWER(?1)")
    Page<Tag> findTagByTitle(String title, Pageable pageable);

    Tag findTagByTitle(String title);

    Optional<Tag> findByGuid (UUID tagGuid);
}
