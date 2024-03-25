@isTest
public class ApplicationsControllerTest {



    @isTest
    private static void testgetApplicationsPositive(){
        // Get data from Factory
        User hiringManager = TestDataFactory.createUser(true);
        List<String> status = new List<String>();
        List<Position__c> positions = TestDataFactory.createPositions(1, hiringManager, status);
        List<Contact> candidates = TestDataFactory.createCandidates(1);

        insert positions; 
        insert candidates;

        List<Application__c> appList = TestDataFactory.createApplications(1, candidates, positions);

        insert appList;

        // Test method
        List<Application__c> resultList = ApplicationsController.getApplications(positions[0].Id);

        Assert.areEqual(resultList[0].Id, appList[0].Id, 'The Method returned the Application');

    }

    @isTest
    private static void testgetApplicationsNegative(){
        // Get data from Factory
        User hiringManager = TestDataFactory.createUser(true);
        List<String> status = new List<String>();
        List<Position__c> positions = TestDataFactory.createPositions(1, hiringManager, status);
        List<Contact> candidates = TestDataFactory.createCandidates(1);

        insert positions; 
        insert candidates;

        List<Application__c> appList = new List<Application__c>();

        // Test method
        List<Application__c> resultList = ApplicationsController.getApplications(positions[0].Id);
        Assert.areEqual(resultList, appList, 'The Method returned more results than expected');

    }


    
}