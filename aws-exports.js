import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        userPoolId: 'eu-central-1_sXobUjqVh',
        userPoolWebClientId: "5vpqdi2hlkvqjsjqd3gsama9c8",
        region: 'eu-central-1'
}});
const currentConfig = Auth.configure();
export default currentConfig;


