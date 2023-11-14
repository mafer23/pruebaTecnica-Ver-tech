package com.medici.app.controller;
import com.medici.app.dto.*;
import com.medici.app.dto.CountyNatalityFilterResidenceAndBirths;
import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.service.BigQueryService2;
import com.medici.app.service.injectdependency.BigQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("bigquery")
@RequiredArgsConstructor
public class BigQueryController {

    private final BigQueryService2 bigQueryService;
    private final BigQueryService bigQueryServiceInterface;

    @GetMapping
    public ResponseEntity<?> getConsult() throws Exception {
        bigQueryService.getConsult();
        return ResponseEntity.status(HttpStatus.OK).body("respuesta correcta");
    }


    @GetMapping("/county-natality")
    public ResponseEntity<List<CountyNatalityResponse>> getCountyNatality() throws Exception {

        List<CountyNatalityResponse> responses = bigQueryServiceInterface.getConsultTable();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/residence-births")
    public ResponseEntity<List<CountyNatalityFilterResidenceAndBirths>> getCountyNatalityResidenceAndBirths() throws Exception {
        List<CountyNatalityFilterResidenceAndBirths> responses = bigQueryServiceInterface.getCountyNatalityResidenceAndBirths();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/abnormal-conditions")
    public ResponseEntity<List<AbnormalConditionsResponse>> getCountyNatalityByAbnormalConditions() throws Exception {
        List<AbnormalConditionsResponse> responses = bigQueryServiceInterface.getCountyNatalityByAbnormalConditions();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/abnormal/condition/filters")
    public ResponseEntity<List<AbnormalConditionsFilters>> abnormalConditionsFilters() throws Exception {
        List<AbnormalConditionsFilters> responses = bigQueryServiceInterface.bnormalConditionsFilters();
        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }

    @GetMapping("/filters")
    public ResponseEntity<List<FiltersDto>> filters(boolean year, boolean countryOfResidence, boolean births,
                                                    boolean aveAgeOfMother) throws Exception {
        List<FiltersDto> responses = bigQueryServiceInterface.filters(year,countryOfResidence,births,aveAgeOfMother);
        return ResponseEntity.status(HttpStatus.OK).body(responses);


    }



}
