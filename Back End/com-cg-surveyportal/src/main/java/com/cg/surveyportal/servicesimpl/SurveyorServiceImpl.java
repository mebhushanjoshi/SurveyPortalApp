package com.cg.surveyportal.servicesimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.surveyportal.entities.Surveyor;
import com.cg.surveyportal.exceptions.InvalidSurveyorException;
import com.cg.surveyportal.exceptions.SurveyorNotFoundException;
import com.cg.surveyportal.repositories.ISurveyorRepository;
import com.cg.surveyportal.services.ISurveyorService;
@Service
public class SurveyorServiceImpl implements ISurveyorService {

	@Autowired
	ISurveyorRepository surveyorRepository;

	@Override
	public List<Surveyor> getAllSurveyors() {
		return surveyorRepository.findAll();
		
	}
	@Override
	public Surveyor getById(Long surveyorId) throws SurveyorNotFoundException {
		
		return surveyorRepository.findById(surveyorId).orElseThrow(()-> new SurveyorNotFoundException("Invalid Surveyor Id"));
	}
	@Override
	public Surveyor getByUsername(String username) throws InvalidSurveyorException {
		
		Surveyor sv = surveyorRepository.findByUsername(username);
		if(sv == null)
		{
			throw new InvalidSurveyorException("Invalid Username");
		}
		return sv;
	}
	@Override
	public String removeById(Long surveyorId) throws InvalidSurveyorException {
		
		Surveyor sv = surveyorRepository.findById(surveyorId).orElseThrow(()-> new InvalidSurveyorException("Invalid Surveyor Id"));
		surveyorRepository.deleteById(sv.getId());
		return "Data Deleted Successfully";
		
	}
	@Override
	public String add(Surveyor surveyor) throws InvalidSurveyorException {
		
		surveyorRepository.save(surveyor);
		return "Surveyor Added Successfully";
	}
	@Override
	public String update(Surveyor surveyor) throws InvalidSurveyorException, SurveyorNotFoundException {
		
		surveyorRepository.save(surveyor);
		return "Surveyor Updated Successfully";
	}
	@Override
	public Long getRecordsCount() {
		
		return surveyorRepository.count();
	}
	@Override
	public String removeAllRecords() {
		
		surveyorRepository.deleteAll();
		return "All Records Deleted ";
	}
	@Override
	public void populateSurveyor() {
		Surveyor serveyor = new Surveyor();
		serveyor.setFirstName("David");
		serveyor.setLastName("Austin");
		serveyor.setUsername("dav_aus");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
		
		serveyor = new Surveyor();
		serveyor.setFirstName("Alex");
		serveyor.setLastName("Berk");
		serveyor.setUsername("berk_aleX");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
		serveyor = new Surveyor();
		serveyor.setFirstName("Christopher");
		serveyor.setLastName("Haywire");
		serveyor.setUsername("hayChristo");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
		serveyor = new Surveyor();
		serveyor.setFirstName("Monica");
		serveyor.setLastName("Williams");
		serveyor.setUsername("MonsWill");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
		serveyor = new Surveyor();
		serveyor.setFirstName("Irene");
		serveyor.setLastName("Nayer");
		serveyor.setUsername("IMnayer");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
		serveyor = new Surveyor();
		serveyor.setFirstName("David");
		serveyor.setLastName("Lee");
		serveyor.setUsername("Dlee");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
		serveyor = new Surveyor();
		serveyor.setFirstName("Oliver");
		serveyor.setLastName("Bell");
		serveyor.setUsername("BellO");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
		serveyor = new Surveyor();
		serveyor.setFirstName("Kelly");
		serveyor.setLastName("Jones");
		serveyor.setUsername("JonesK");
		//serveyor.setSurveys(null);
		surveyorRepository.save(serveyor);
		/*----------------------------------------------*/
	}
}
