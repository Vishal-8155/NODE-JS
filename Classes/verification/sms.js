const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

let apiInstance = new SibApiV3Sdk.SMSCampaignsApi();

let campaignId = 1;

let phoneNumber = new SibApiV3Sdk.SendTestSms();

phoneNumber.phoneNumber = '+918155037781'; // Replace with the recipient's valid phone number

apiInstance.sendTestSms(campaignId, phoneNumber).then(function() {
    console.log('API called successfully.');
}).catch(function(error) {
    console.error('Error sending test SMS:', error.response ? error.response.body : error.message);
});
