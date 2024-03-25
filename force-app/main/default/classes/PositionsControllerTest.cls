@isTest
public class PositionsControllerTest {
    
    @isTest
    private static void testgetPositionsPositive(){
        // Get data from Factory
        User hiringManager = TestDataFactory.createUser(true);
        List<String> status = new List<String>();
        List<Position__c> positions = TestDataFactory.createPositions(1, hiringManager, status);

        insert positions; 

        // Test method
        List<Position__c> resultList = PositionsController.getPositions();

        Assert.areEqual(resultList[0].Id, positions[0].Id, 'The Method returned the Position');

    }

    @isTest
    private static void testgetPositionsNegative(){
        // Get data from Factory

        List<Position__c> positions = new List<Position__c>();

        // Test method
        List<Position__c> resultList = PositionsController.getPositions();
        Assert.areEqual(resultList, positions, 'The Method returned more results than expected');

    }


}