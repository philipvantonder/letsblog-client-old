import Vue from 'vue'
import moment from 'moment'

Vue.filter("BooleanText", value => {
	return (value ? "Yes" : "No")
})

Vue.filter("LimitText", (text, length) => {
	return text.substring(0, length) + '...'
})

Vue.filter("Date", value => {
	return moment(value).format('YYYY-MM-DD HH:MM:SS')
})