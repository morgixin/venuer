package com.devweb.venuer.repository;

import com.devweb.venuer.model.Files;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<Files, Long> {

    Files findByName(String name);
}
