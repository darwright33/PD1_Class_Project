@isTest
private class ReviewControllerTest {
    
    @isTest
    public static void getReviewsTest(){

        // Get data from Factory
        User hiringManager = TestDataFactory.createUser(true);
        List<String> status = new List<String>();
        List<Position__c> positions = TestDataFactory.createPositions(1, hiringManager, status);
        insert positions; 

        List<Contact> candidates = TestDataFactory.createCandidates(1);
        insert candidates;

        List<Application__c> appList = TestDataFactory.createApplications(1, candidates, positions);
        insert appList;

        // Generally don't have to insert Users for them to work.
        User u = TestDataFactory.createUser(true);
        List<User> userList = new List<User>();
        userList.add(u);

        List<Interviewer__c> intList = TestDataFactory.createInterviewers(appList, userList, positions);
        insert intList;

        List<Review__c> revList = TestDataFactory.createReviews(appList, intList);
        insert revList;


        // Test method
        List<Review__c> resultList = ReviewController.getReviews(appList[0].Id);
        Assert.areEqual(resultList[0].Id, revList[0].Id, 'The Record Id did not match');

    } // End getReviewsTest

    @isTest
    public static void getInterviewsTest(){

        // Get data from Factory
        User hiringManager = TestDataFactory.createUser(true);
        List<String> status = new List<String>();
        List<Position__c> positions = TestDataFactory.createPositions(1, hiringManager, status);
        insert positions; 

        List<Contact> candidates = TestDataFactory.createCandidates(1);
        insert candidates;

        List<Application__c> appList = TestDataFactory.createApplications(1, candidates, positions);
        insert appList;

        // Generally don't have to insert Users for them to work.
        User u = TestDataFactory.createUser(true);
        List<User> userList = new List<User>();
        userList.add(u);

        List<Interviewer__c> intList = TestDataFactory.createInterviewers(appList, userList, positions);
        insert intList;

        List<Review__c> revList = TestDataFactory.createReviews(appList, intList);
        insert revList;


        // Test method
        List<ReviewController.ReviewWrapper> resultList = ReviewController.getInterviews(appList[0].Id);
        Assert.areEqual(resultList.size(), revList.size(), 'The Size did not match');

    } // End getInterviewsTest

    @isTest
    public static void getInterviewerScheduleTest(){

        // Get data from Factory
        User hiringManager = TestDataFactory.createUser(true);
        List<String> status = new List<String>();
        String a = 'New';
        String b = 'Open';
        status.add(a);
        status.add(b);

        List<Position__c> positions = TestDataFactory.createPositions(2, hiringManager, status);
        insert positions; 

        List<Contact> candidates = TestDataFactory.createCandidates(2);
        insert candidates;

        List<Application__c> appList = TestDataFactory.createApplications(2, candidates, positions);
        insert appList;

        // Generally don't have to insert Users for them to work.
        User u = TestDataFactory.createUser(true);
        List<User> userList = new List<User>();
        userList.add(u);
        User u2 = TestDataFactory.createUser(true);
        userList.add(u2);

        List<Interviewer__c> intList = TestDataFactory.createInterviewers(appList, userList, positions);
        insert intList;

        List<Review__c> revList = TestDataFactory.createReviews(appList, intList);
        revList[0].Interview_Time__c = System.Today() + 5;
        insert revList;

        // Test method
        List<Review__c> resultList = ReviewController.getInterviewerSchedule(intList[0].Interviewer__c);
        Assert.areEqual(resultList.size(), revList.size(), 'The Size did not match');

    } // End getInterviewerScheduleTest


}