package com.medici.app.service;


import com.google.cloud.bigquery.*;
import com.medici.app.dto.CountyNatalityResponse;
import com.medici.app.service.injectdependency.BigQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BigQueryService2 implements BigQueryService {


    private final BigQuery bigquery;

    public List<String> getConsult() throws Exception {
        List<String> jsonResults = new ArrayList<>();

        String GET_COUNTY_NATALITY = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 10;";
        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(GET_COUNTY_NATALITY).build();
        Job queryJob = bigquery.create(JobInfo.newBuilder(
                queryConfig).build());
        queryJob = queryJob.waitFor();
        if(queryJob == null){
            throw new Exception("Job no longer exixts");
        }
        if(queryJob.getStatus().getError() != null){
            throw new Exception(queryJob.getStatus().getError().toString());
        }
        System.out.println("Imprimiento resultados");
        TableResult result = queryJob.getQueryResults();
        for(FieldValueList row : result.iterateAll()){

            String year = row.get("Year").getStringValue();
            String countyOfResidence = row.get("County_of_Residence").getStringValue();

            // Crear un objeto JSON simple con los datos que deseas
            String jsonResult = String.format("{\"Year\": \"%s\", \"County_of_Residence\": \"%s\"}", year, countyOfResidence);
            jsonResults.add(jsonResult);
            System.out.println(jsonResult);



        }
        return jsonResults;

    }

    @Override
    public List<CountyNatalityResponse> getConsultTable() throws Exception {

        String GET_COUNTY_NATALITY = "SELECT * FROM `bigquery-public-data.sdoh_cdc_wonder_natality.county_natality` LIMIT 10;";

        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(GET_COUNTY_NATALITY).build();
        Job queryJob = bigquery.create(JobInfo.newBuilder(queryConfig).build());

        queryJob = queryJob.waitFor();

        if(queryJob == null){
            throw new Exception("Job no longer exixts");
        }
        if(queryJob.getStatus().getError() != null){
            throw new Exception(queryJob.getStatus().getError().toString());
        }
        System.out.println("Imprimiento resultados");
        TableResult result = queryJob.getQueryResults();

        for (FieldValueList row: result.iterateAll()){
            
        }

        return null;
    }
}
