package com.expleo.turistmo.turistmo.repository;

import com.expleo.turistmo.turistmo.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

}
