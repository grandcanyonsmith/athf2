import { useContext } from 'react';
import { PrivacyContext } from '../context/privacyContext';

const PrivacyHook = () => {
    const [state, setState] = useContext(PrivacyContext);

    function getPrivacyData() {
            const data = [
                {
                    title: 'WEBSITE VISITORS',
                    data: [
                        'Like most website operators, Total Health and Fitness collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request. Total Health and Fitness’ purpose in collecting non-personally identifying information is to better understand how Total Health and Fitness’ visitors use its website. From time to time, Total Health and Fitness may release non-personally-identifying information in the aggregate, e.g., by publishing a report on trends in the usage of its website.',
                        'Total Health and Fitness also collects potentially personally-identifying information like Internet Protocol (IP) addresses for logged in users and for users leaving comments on totalhealthandfitness.com blogs/sites. Total Health and Fitness only discloses logged in user and commenter IP addresses under the same circumstances that it uses and discloses personally-identifying information as described below, except that commenter IP addresses and email addresses are visible and disclosed to the administrators of the blog/site where the comment was left.'
                    ]
                },
                {
                    title: 'GATHERING OF PERSONALLY-IDENTIFYING INFORMATION',
                    data: [
                        'Certain visitors to Total Health and Fitness’ websites choose to interact with Total Health and Fitness in ways that require Total Health and Fitness to gather personally-identifying information. The amount and type of information that Total Health and Fitness gathers depends on the nature of the interaction. For example, we ask visitors who sign up at totalhealthandfitness.com to provide a username and email address. Those who engage in transactions with Total Health and Fitness are asked to provide additional information, including as necessary the personal and financial information required to process those transactions. In each case, Total Health and Fitness collects such information only insofar as is necessary or appropriate to fulfill the purpose of the visitor’s interaction with Total Health and Fitness. Total Health and Fitness does not disclose personally-identifying information other than as described below. And visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.'
                    ]
                },
                {
                    title: 'AGGREGATED STATISTICS',
                    data: [
                        'Total Health and Fitness may collect statistics about the behavior of visitors to its websites. Total Health and Fitness may display this information publicly or provide it to others. However, Total Health and Fitness does not disclose personally-identifying information other than as described below.'
                    ]
                },
                {
                    title: 'PROTECTION OF CERTAIN PERSONALLY-IDENTIFYING INFORMATION',
                    data: [
                        'Total Health and Fitness discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Total Health and Fitness’ behalf or to provide services available at Total Health and Fitness’ websites, and (ii) that have agreed not to disclose it to others. Some of those employees, contractors and affiliated organizations may be located outside of your home country; by using Total Health and Fitness’ websites, you consent to the transfer of such information to them. Total Health and Fitness will not rent or sell potentially personally-identifying and personally-identifying information to anyone. Other than to its employees, contractors and affiliated organizations, as described above, Total Health and Fitness discloses potentially personally-identifying and personally-identifying information only in response to a subpoena, court order or other governmental request, or when Total Health and Fitness believes in good faith that disclosure is reasonably necessary to protect the property or rights of Total Health and Fitness, third parties or the public at large. If you are a registered user of a Total Health and Fitness website and have supplied your email address, Total Health and Fitness may occasionally send you an email to tell you about new features, solicit your feedback, or just keep you up to date with what’s going on with Total Health and Fitness and our products. If you send us a request (for example via email or via one of our feedback mechanisms), we reserve the right to publish it in order to help us clarify or respond to your request or to help us support other users. Total Health and Fitness takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.'
                    ]
                },
                {
                    title: 'COOKIES',
                    data: [
                        'A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. Total Health and Fitness uses cookies to help Total Health and Fitness identify and track visitors, their usage of Total Health and Fitness website, and their website access preferences. Total Health and Fitness visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Total Health and Fitness’ websites, with the drawback that certain features of Total Health and Fitness’ websites may not function properly without the aid of cookies.'
                    ]
                },
                {
                    title: 'BUSINESS TRANSFERS',
                    data: [
                        'If Total Health and Fitness, or substantially all of its assets, were acquired, or in the unlikely event that Total Health and Fitness goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquirer of Total Health and Fitness may continue to use your personal information as set forth in this policy.'
                    ]
                },
                {
                    title: 'ADS',
                    data: [
                        'Ads appearing on any of our websites may be delivered to users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This Privacy Policy covers the use of cookies by Total Health and Fitness and does not cover the use of cookies by any advertisers.'
                    ]
                },
                {
                    title: 'PRIVACY POLICY CHANGES',
                    data: [
                        'Although most changes are likely to be minor, Total Health and Fitness may change its Privacy Policy from time to time, and in Total Health and Fitness’ sole discretion. Total Health and Fitness encourages visitors to frequently check this page for any changes to its Privacy Policy. If you have a totalhealthandfitness.com account, you might also receive an alert informing you of these changes. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.'
                    ]
                }
            ];
            setState((stateObj:any) => ({
                ...stateObj,
                privacyData: data
              }));
    }

    function onItemSelect(index:number) {
        const { privacyData } = state;
        privacyData[index].isDisplay = !privacyData[index].isDisplay;
        setState((stateObj:any) => ({
            ...stateObj,
            privacyData
          }));
    }

    return {
        privacyData: state.privacyData,
        getPrivacyData,
        onItemSelect
    }
};

export default PrivacyHook;
