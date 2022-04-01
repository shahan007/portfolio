import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import emailjs from '@emailjs/browser';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECTID,
    dataset: process.env.REACT_APP_SANITY_DATASET,
    apiVersion: process.env.REACT_APP_SANITY_APIVERSION,
    useCdn: process.env.REACT_APP_SANITY_USECDN,
    token: process.env.REACT_APP_SANITY_TOKEN    
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const sendEmailJS = (sender_name, sender_email, message, setLoading, setIsFormSubmitted) => {

    const templateParams = {
        sender_name: sender_name,
        sender_email:sender_email,
        message:message        
    };

    emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams, 
        process.env.REACT_APP_EMAILJS_USER_ID
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            setLoading(false)
            setIsFormSubmitted(true)
        }, (err) => {
            setTimeout(() => {
                setLoading(false)
            }, 1000);             
        });    
}