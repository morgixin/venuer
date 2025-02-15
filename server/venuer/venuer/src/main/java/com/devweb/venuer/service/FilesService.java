package com.devweb.venuer.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.devweb.venuer.repository.FileRepository;
import com.devweb.venuer.model.Files;

@Service
public class FilesService {

    private static final Logger log = LoggerFactory.getLogger(FilesService.class);

    @Autowired
    private FileRepository fileRepository;

    private final String FILE_PATH = "files/";
//
//    public FilesService() throws IOException {
//        // Get the path to the resources/static directory
//        File staticDir = new ClassPathResource("static").getFile();
//        this.FILE_PATH = staticDir.getAbsolutePath() + File.separator;
//    }

    public String storeFile(MultipartFile file) throws IOException {
        Files files = Files
                .builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(file.getBytes()).build();

        files = fileRepository.save(files);

        log.info("File uploaded successfully into database with id {}", files.getId());

        if (files.getId() != null) {
            return "File uploaded successfully into database";
        }

        return null;
    }

    public byte[] getFiles(String fileName) {
        return fileRepository.findByName(fileName).getImageData();
    }

    public List<Files> getAllFiles() {
        return fileRepository.findAll();
    }

    public String storeDataIntoFileSystem(MultipartFile file) throws IOException {
        String filePath = FILE_PATH + file.getOriginalFilename();

        Files files = Files.builder().name(file.getOriginalFilename()).path(filePath).type(file.getContentType())
                .imageData(file.getBytes()).build();

        files = fileRepository.save(files);

        file.transferTo(new File(filePath));

        if (files.getId() != null) {
            return "File uploaded successfuly into database";
        }

        return null;
    }

    public byte[] downloadFilesFromFileSystem(String fileName) throws IOException {
        String path = fileRepository.findByName(fileName).getPath();

        return java.nio.file.Files.readAllBytes(new File(path).toPath());
    }
}