import { GraphQLClient } from 'graphql-request';
import SETTINGS from '../config/settings';

export const client = new GraphQLClient(SETTINGS.graphCMS_URL, {
    headers: {
        authorization: `Bearer ${SETTINGS.graphCMS_Token}`
    }
});
