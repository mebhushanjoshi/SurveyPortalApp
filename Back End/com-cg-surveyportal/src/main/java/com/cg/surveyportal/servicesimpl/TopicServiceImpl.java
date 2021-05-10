package com.cg.surveyportal.servicesimpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cg.surveyportal.entities.Survey;
import com.cg.surveyportal.entities.Surveyor;
import com.cg.surveyportal.entities.Topic;
import com.cg.surveyportal.exceptions.InvalidSurveyorException;
import com.cg.surveyportal.exceptions.InvalidTopicNameException;
import com.cg.surveyportal.exceptions.SurveyorNotFoundException;
import com.cg.surveyportal.exceptions.TopicNotFoundException;
import com.cg.surveyportal.repositories.ITopicRepository;
import com.cg.surveyportal.services.ISurveyorService;
import com.cg.surveyportal.services.ITopicService;

/**
 * Implementation class for ITopicService which contains our business logics.
 */
@Service
public class TopicServiceImpl implements ITopicService {

	@Autowired
	private ITopicRepository topicRepository;
	@Autowired
	private ISurveyorService surveyorService;
	
	@Override
	public Topic getTopicDetails(long id) throws TopicNotFoundException {
		return topicRepository.findById(id).orElseThrow(()-> new TopicNotFoundException("Topic with id:"+id+" does not exist"));
	}
	@Override
	public List<Topic> getTopicsDetails(String name) throws TopicNotFoundException {
		List<Topic> listTopicByName = topicRepository.findByName(name);
		if(listTopicByName.isEmpty())
			throw new TopicNotFoundException("Topic with name "+name+" does not exist");
		return listTopicByName;
	}
	@Override
	public List<Topic> getAllTopic() {
		return topicRepository.findAll();
	}
	@Override
	public Topic removeTopic(long id) throws TopicNotFoundException {
		Topic deletedTopic = this.getTopicDetails(id);
		deletedTopic.setSurveyor(null);
		topicRepository.deleteById(id);
		return deletedTopic;
	}
	@Override
	public long getTopicCount() {
		return topicRepository.count();
	}
	@Override
	public void addSurveysToTopic(Survey survey, String topicName) throws TopicNotFoundException {
		Topic addSurveyTo = Optional.of(topicRepository.findByName(topicName).get(0)).orElseThrow(()-> new TopicNotFoundException("Topic with name \""+topicName+"\" does not exist"));
		addSurveyTo.getSurveys().add(survey);
		topicRepository.save(addSurveyTo);
	}
	@Override
	public Topic addTopic(String name, String description, String surveyorUsername) throws SurveyorNotFoundException, InvalidSurveyorException, InvalidTopicNameException, TopicNotFoundException{
		List<Topic> listTopicByName = topicRepository.findByName(name);
		if(listTopicByName.size() > 0)
			throw new InvalidTopicNameException("Topic with name "+name+" already exist");
		Topic newTopic = new Topic();
		newTopic.setName(name);
		newTopic.setDescription(description);
		newTopic.setSurveyor(surveyorService.getByUsername(surveyorUsername));
		if(newTopic.getSurveyor() == null)
				throw new SurveyorNotFoundException("Surveyor with username: "+surveyorUsername+" does not exist");
		topicRepository.save(newTopic);
		return newTopic;
	}
	@Override
	public Topic updateTopicName(long id, String name) throws TopicNotFoundException, InvalidTopicNameException {
		List<Topic> listTopicByName = topicRepository.findByName(name);
		if(listTopicByName.size() > 0)
			throw new InvalidTopicNameException("Topic with name "+name+" already exist");
		Topic updateTopic = this.getTopicDetails(id);
		updateTopic.setName(name);
		topicRepository.save(updateTopic);
		return updateTopic;
	}
	@Override
	public Topic updateTopicDescription(long id, String description) throws TopicNotFoundException {
		Topic updateTopic = this.getTopicDetails(id);
		updateTopic.setDescription(description);
		topicRepository.save(updateTopic);
		return updateTopic;
	}
	@Override
	public long getSurveyCountOnTopic(String name) throws TopicNotFoundException {
		return this.getTopicsDetails(name).get(0).getSurveys().size();
	}
	@Override
	public Topic changeSurveyor(long topicId, long surveyorId) throws TopicNotFoundException, SurveyorNotFoundException {
		Topic topic = this.getTopicDetails(topicId);
		Surveyor surveyor = Optional.of(surveyorService.getById(surveyorId)).orElseThrow(()-> new SurveyorNotFoundException("Surveyor with id:"+surveyorId+" does not exist"));
		topic.setSurveyor(surveyor);
		topicRepository.save(topic);
		return topic;
	}
	@Override
	public List<Topic> getTopicsWithNoSurveys() {
		return this.getAllTopic().stream().filter(topic -> topic.getSurveys().isEmpty()).collect(Collectors.toList());
	}
	
	@Override
	public void populateTopic() throws InvalidSurveyorException {
		List<Topic> topicList = new ArrayList<>();

		Topic topic = new Topic();
		topic.setName("Product Feedback");
		topic.setDescription("How the users are feeling about a particular product they brought?");
		topic.setSurveyor(surveyorService.getByUsername("Dlee"));
		topic.setSurveys(null);
		topicList.add(topic);
		//*************************************//
		topic = new Topic();
		topic.setName("Employee Satisfaction");
		topic.setDescription("How much satisfied the employees are with their organizational performance?");
		topic.setSurveyor(surveyorService.getByUsername("MonsWill"));
		topic.setSurveys(null);
		topicList.add(topic);
		//*************************************//
		topic = new Topic();
    	topic.setName("Brand Awareness");
		topic.setDescription("Checking the awareness of particular brand among the general public.");
		topic.setSurveyor(surveyorService.getByUsername("JonesK"));
		topic.setSurveys(null);
		topicList.add(topic);
		//*************************************//
		topic = new Topic();
		topic.setName("Customer Satisfaction");
		topic.setDescription("How much satisfied the customers are with the services they were provided?");
		topic.setSurveyor(surveyorService.getByUsername("IMnayer"));
		topic.setSurveys(null);
		topicList.add(topic);
		//*************************************//
		topic = new Topic();
		topic.setName("Job Satisfaction");
		topic.setDescription("How the people feel about their job and profession?");
		topic.setSurveyor(surveyorService.getByUsername("BellO"));
		topic.setSurveys(null);
		topicList.add(topic);
		//*************************************//
		topic = new Topic();
		topic.setName("Exit Survey");
		topic.setDescription("How the user feels after the end of a particular event?");
		topic.setSurveyor(surveyorService.getByUsername("dav_aus"));
		topic.setSurveys(null);
		topicList.add(topic);
		//*************************************//
		topicRepository.saveAll(topicList);
	}
}
