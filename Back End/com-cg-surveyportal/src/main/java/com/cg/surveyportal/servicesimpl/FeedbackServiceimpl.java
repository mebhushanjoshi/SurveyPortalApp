package com.cg.surveyportal.servicesimpl;

import java.util.List;
import java.time.LocalDateTime;
import java.time.Month;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cg.surveyportal.entities.Feedback;
import com.cg.surveyportal.exceptions.FeedbackNotFoundException;
import com.cg.surveyportal.exceptions.ParticipantNotFoundException;
import com.cg.surveyportal.exceptions.SurveyNotFoundException;
import com.cg.surveyportal.repositories.IFeedbackRepository;
import com.cg.surveyportal.services.IFeedbackService;
import com.cg.surveyportal.services.IParticipantService;
import com.cg.surveyportal.services.IQuestionService;
import com.cg.surveyportal.services.ISurveyService;

@Service
public class FeedbackServiceimpl implements IFeedbackService {

	@Autowired
	IFeedbackRepository feedbackRepository;
	@Autowired
	ISurveyService surveyService;
	@Autowired
	IParticipantService participantService;
	@Autowired
	IQuestionService questionService;

	@Override
	public List<Feedback> getAll() {
		return feedbackRepository.findAll();
	}
	@Override
	public Feedback getById(long feedbackId) throws FeedbackNotFoundException {
		Feedback feedbackById = feedbackRepository.findById(feedbackId).orElseThrow(()-> new FeedbackNotFoundException("Feedback does not exist"));
		return feedbackById;
	}
	@Override
	public Feedback removeById(Long feedbackId) {
		Feedback deletedFeedback = feedbackRepository.findById(feedbackId).get();
		feedbackRepository.deleteById(feedbackId);
		return deletedFeedback;
	}
	@Override
	public void addFeedback(long participantId, long surveyId, long questionId, String option) throws ParticipantNotFoundException, SurveyNotFoundException {
		Feedback feedback = new Feedback();
		feedback.setParticipant(participantService.findParticipantById(participantId));
		feedback.setSurvey(surveyService.getSurveyById(surveyId));
		feedback.setQuestion(questionService.getById(questionId));
		feedback.setPostedDateTime(LocalDateTime.now());
		feedback.setChosenOption(option);
		feedbackRepository.save(feedback);
		participantService.findParticipantById(participantId).getFeedback().add(feedback);
	}
	
	@Override
public void populateFeedback() throws ParticipantNotFoundException, SurveyNotFoundException {
		
		Feedback feedback = new Feedback();
		feedback.setPostedDateTime(LocalDateTime.of(2021,Month.APRIL, 9, 05, 29, 10));
		feedback.setSurvey(surveyService.getSurveyById(15));
		feedback.setParticipant(participantService.findParticipantById(23L));
		feedback.setQuestion(questionService.getById(19));
		feedback.setChosenOption("Satisfied");
		feedbackRepository.save(feedback);
		participantService.addFeedbackToParticipant(23L, feedback);
		//*************************************//
		feedback = new Feedback();
		feedback.setPostedDateTime(LocalDateTime.of(2021,Month.MARCH, 9, 14, 52, 10));
		feedback.setSurvey(surveyService.getSurveyById(16));
		feedback.setParticipant(participantService.findParticipantById(24L));
		feedback.setQuestion(questionService.getById(20));
		feedback.setChosenOption("Satisfied");
		feedbackRepository.save(feedback);
		participantService.addFeedbackToParticipant(24L, feedback);
		//*************************************//
		feedback = new Feedback();
		feedback.setPostedDateTime(LocalDateTime.of(2021,Month.APRIL, 14, 20, 21, 53));
		feedback.setSurvey(surveyService.getSurveyById(17));
		feedback.setParticipant(participantService.findParticipantById(25L));
		feedback.setQuestion(questionService.getById(21));
		feedback.setChosenOption("Very satisfied");
		feedbackRepository.save(feedback);
		participantService.addFeedbackToParticipant(25L, feedback);
		//*************************************//
		feedback = new Feedback();
		feedback.setPostedDateTime(LocalDateTime.of(2021,Month.APRIL, 7, 23, 18, 42));
		feedback.setSurvey(surveyService.getSurveyById(18));
		feedback.setParticipant(participantService.findParticipantById(26L));
		feedback.setQuestion(questionService.getById(22));
		feedback.setChosenOption("Dissatisfied");
		feedbackRepository.save(feedback);
		participantService.addFeedbackToParticipant(26L, feedback);
		//*************************************//
	}
	
}
