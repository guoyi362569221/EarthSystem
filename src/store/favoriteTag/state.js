
import {
	store
} from 'utils/';

export default {
    favoriteTags: store.get('favoriteTags') ||[]
};