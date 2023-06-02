var _counter = 0;
var _update_clock_interval_id;
var _update_message_interval_id;
var _launch_date = new Date(2009, 10, 27, 12, 18, 05, 0);

function get_element_by_id(element_id) {
	return (element_id) ? document.getElementById(element_id) : null;
}

function update_clock(element_id) {
	element = get_element_by_id(element_id);
	if (element) {
		current_time = new Date();
		current_hours = current_time.getHours();
		current_minutes = current_time.getMinutes();
		current_seconds = current_time.getSeconds();
		current_minutes = (current_minutes < 10 ? '0' : '') + current_minutes;
		current_seconds = (current_seconds < 10 ? '0' : '') + current_seconds;
		current_time_of_day = (current_hours < 12) ? 'AM' : 'PM';
		current_hours = (current_hours > 12) ? current_hours - 12 : current_hours;
		current_hours = (current_hours == 0) ? 12 : current_hours;
		current_time_string = current_hours + ':' + current_minutes + ':' + current_seconds + '&nbsp;' + current_time_of_day;
		element.innerHTML = current_time_string;
	}
}

function update_message(element_id, message) {
	element = get_element_by_id(element_id);
	if (element && message) {
		var index = _counter;
		if (index < message.length) {
			current_html = element.innerHTML;
			if (current_html == '&nbsp;') {
				current_html = '';
			}
			next_character = message.substring(index, index + 1);
			if (next_character) {
				current_html += next_character;
				element.innerHTML = current_html;
			}
			_counter++;
		}
		else {
			element.innerHTML += '<br/><div id="launch_date">(since: ' + _launch_date + ')</div>';
			clearInterval(_update_message_interval_id);
		}
	}
}

function exit_site() {
	current_window = window;
	parent_window = current_window.parent;
	while (current_window != parent_window) {
		current_window = parent_window;
		parent_window = parent_window.parent;
	}
	current_window.location = 'http://www.google.com';
}

window.onload = function() {
	update_clock('clock');
	_update_clock_interval_id = setInterval("update_clock('clock')", 1000);
	_update_message_interval_id = setInterval("update_message('coming_soon', 'Coming Soon!!1!')", 500);
	initialize_menu('file_menu',
    [
      {
        'text': 'File',
        'children': [
          {
            'text': 'Exit',
            'onclick': exit_site
          }
        ]
      }, {
        'text': 'Edit'
      }, {
        'text': 'View',
        'children': [
          {
            'text': 'GitHub',
            'href': 'https://github.com/jzaleski'
          }, {
            'text': 'LinkedIn',
            'href': 'https://www.linkedin.com/in/jonathan-w-zaleski'
          }
        ]
      }, {
        'text': 'About',
        'children': [
          {
            'text': 'Resume',
            'href': 'https://resume.jzaleski.com'
          }
        ]
      }
    ]
  );
}
