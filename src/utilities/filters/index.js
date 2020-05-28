import moment from 'moment';

function BooleanText(value) {
	return (value ? "Yes" : "No");
}

function LimitText (text, length_val) {
	
	if (text.length > length_val) {
		return text.substring(0, length_val) + '...';
	}

	return text;

}

function FormatDate (date) {

	if (!date) {
		return "";
	}

	return moment(date).format('YYYY-MM-DD HH:MM:SS');

}

export { BooleanText, LimitText, FormatDate };