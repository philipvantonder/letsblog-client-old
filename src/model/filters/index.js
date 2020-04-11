import Vue from 'vue'
import moment from 'moment'

Vue.filter("BooleanText", value => {
	return (value ? "Yes" : "No")
})

Vue.filter("LimitText", (text, length_val) => {

	if (text.length > length_val) {
		return text.substring(0, length_val) + '...'
	}

	return text;

})

Vue.filter("Date", value => {
	
	if (!value) {
		return "";
	}

	return moment(value).format('YYYY-MM-DD HH:MM:SS')
})