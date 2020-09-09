import {
	store
} from 'utils/';

export default {
	visitedViews: store.get('visitedViews') ||[],
    cachedViews: []
};