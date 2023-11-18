package com.medici.app.service;

import com.medici.app.dto.ConsultRequest;
import com.medici.app.entity.CountyNatality;
import com.medici.app.entity.CountyNatalityBase;
import com.medici.app.mapper.ConsultMapper;
import com.medici.app.repository.ConsultRepository;
import com.medici.app.service.injectdependency.ConsultService;
import com.medici.app.service.injectdependency.CountyNatalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultServiceImpl implements ConsultService {

    private final ConsultRepository consultRepository;
    private final ConsultMapper consultMapper;


    @Override
    public void save(ConsultRequest request) {
        CountyNatalityBase base = consultMapper.maptoConsultRequest(request);
        if(consultRepository.existsByNameConsultAndNameUser(request.getNameConsult(), request.getNameUser())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Este nombre ya esta en uso");
        }
        List<CountyNatality> countyNatalities = consultMapper.maptoCountyNatalityBaseList(request.getCountyNatalityBaseList());
        countyNatalities.forEach(natality -> natality.setCountyNatalityBase(base));

        base.setCountyNatalities(countyNatalities);

        consultRepository.save(base);
    }
}
