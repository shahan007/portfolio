import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECTID,
    dataset: process.env.REACT_APP_SANITY_DATASET,
    apiVersion: process.env.REACT_APP_SANITY_APIVERSION,
    useCdn: process.env.REACT_APP_SANITY_USECDN,
    token: process.env.REACT_APP_SANITY_TOKEN    
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);