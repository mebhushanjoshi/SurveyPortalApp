package com.cg.surveyportal.servicesimpl;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.surveyportal.entities.Survey;
import com.cg.surveyportal.exceptions.InvalidSurveyException;
import com.cg.surveyportal.exceptions.SurveyNotFoundException;
import com.cg.surveyportal.exceptions.SurveyorNotFoundException;
import com.cg.surveyportal.exceptions.TopicNotFoundException;
import com.cg.surveyportal.repositories.ISurveyRepository;
import com.cg.surveyportal.services.ISurveyService;
import com.cg.surveyportal.services.ISurveyorService;
import com.cg.surveyportal.services.ITopicService;

@Service
public class SurveyServiceImpl implements ISurveyService {
	
	@Autowired
	ISurveyRepository surveyRepository;
	@Autowired
	ITopicService topicService; 
	@Autowired
	ISurveyorService surveyorService; 
	
	//getting all Survey record by using the method findaAll() of JpaRepository
	@Override
	public List<Survey> getAllSurveys() {
		List<Survey> surveyById = surveyRepository.findAll();
		return surveyById;
	}
	//getting a specific Survey record using the method findById() of JpaRepository
	@Override
	public Survey getSurveyById(long id) throws SurveyNotFoundException {
		return surveyRepository.findById(id).orElseThrow(()-> new SurveyNotFoundException("Invalid SurveyId"));
	}
	//deleting all surveys
	@Override
	public void deleteAllsurveys() {
		surveyRepository.deleteAll(); 
	}
    //updating details of specific Survey
	@Override
	public Survey updateSurveyDescription(Long surveyId, String description) throws SurveyNotFoundException {
		Survey survey=surveyRepository.findById(surveyId).get();
		survey.setDescription(description);
		surveyRepository.save(survey);
		return survey;
	}
	//Adding new Surveys with details to the database
	@Override
	public Survey add(Survey survey) throws InvalidSurveyException {
		surveyRepository.save(survey);
		return survey;
	}
	//deleting a specific record by using the method deleteById() of JpaRepository
	@Override
	public void removeSurveyById(Long id) throws SurveyNotFoundException {
		surveyRepository.deleteById(id);
	}
	@Override
	public void closeSurvey(long id) throws SurveyNotFoundException {
		Survey survey = this.getSurveyById(id);
		survey.setIsActive(false);
		surveyRepository.save(survey);
	}
	@Override
public void populateSurvey() throws TopicNotFoundException, SurveyorNotFoundException {
		
		Survey survey = new Survey();
		survey.setDescription("Dear user, we would like to request you kindly give us your crucial feedback on your recent purchases of a new iphone.");
		survey.setPublishedDateTime(LocalDateTime.of(2021,Month.MARCH, 29, 13, 30, 40));
		survey.setEndDateTime(LocalDateTime.of(2021,Month.MAY, 29, 23, 59, 59));
		survey.setIsActive(true);
		String topic ="Product Feedback";
		survey.setTopic(topicService.getTopicsDetails(topic).get(0));
		topicService.addSurveysToTopic(survey, topic);
		survey.setSurveyor(surveyorService.getById((long) 4));
	//	surveyorService.addSurveysToSurveyor(survey, 4);
		surveyRepository.save(survey);
//		//*************************************//
		survey = new Survey();
		survey.setDescription("Dear employee, we would like to request you kindly give us your feedback based on your working in our organization.");
		survey.setPublishedDateTime(LocalDateTime.of(2021,Month.MARCH, 1, 16, 42, 13));
		survey.setEndDateTime(LocalDateTime.of(2021,Month.APRIL, 1, 23, 59, 59));
		survey.setIsActive(false);
		topic ="Employee Satisfaction";
		survey.setTopic(topicService.getTopicsDetails(topic).get(0));
		topicService.addSurveysToTopic(survey, topic);
		survey.setSurveyor(surveyorService.getById((long) 3));
//		surveyorService.addSurveysToSurveyor(survey, 3);
		surveyRepository.save(survey);
		//*************************************//
		survey = new Survey();
		survey.setDescription("Dear audience, we will be pleased if you let us know about our performance via this feedback.");
		survey.setPublishedDateTime(LocalDateTime.of(2021,Month.APRIL, 13, 20, 00, 00));
		survey.setEndDateTime(LocalDateTime.of(2021,Month.APRIL, 25, 23, 59, 59));
		survey.setIsActive(true);
		topic ="Exit Survey";
		survey.setTopic(topicService.getTopicsDetails(topic).get(0));
		topicService.addSurveysToTopic(survey, topic);
		survey.setSurveyor(surveyorService.getById((long) 8));
//		surveyorService.addSurveysToSurveyor(survey, 8);
		surveyRepository.save(survey);
		//*************************************//
		survey = new Survey();
		survey.setDescription("Dear customer, hope your trip went well last week kindly fill give us your valuable feedback so the we can grow more.");
		survey.setPublishedDateTime(LocalDateTime.of(2021,Month.APRIL, 6, 18, 15, 53));
		survey.setEndDateTime(LocalDateTime.of(2021,Month.APRIL, 17, 23, 59, 59));
		survey.setIsActive(true);
		topic ="Customer Satisfaction";
		survey.setTopic(topicService.getTopicsDetails(topic).get(0));
		topicService.addSurveysToTopic(survey, topic);
		survey.setSurveyor(surveyorService.getById((long) 1));
//		surveyorService.addSurveysToSurveyor(survey, 1);
		surveyRepository.save(survey);
	}
	
}
