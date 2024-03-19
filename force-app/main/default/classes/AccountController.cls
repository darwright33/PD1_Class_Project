public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id, Name, AnnualRevenue, Phone FROM Account WITH SECURITY_ENFORCED Limit 5 ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getTopAccounts(){
        return [SELECT Id, Name, AnnualRevenue, Phone FROM Account 
                    WHERE AnnualRevenue > 0
                    AND AnnualRevenue != NULL
                    WITH SECURITY_ENFORCED 
                    ORDER BY AnnualRevenue DESC 
                    Limit 5 ];
    }


}