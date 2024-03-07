public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, name, AnnualRevenue, Phone FROM Account WITH SECURITY_ENFORCED Limit 5 ];
    }
}