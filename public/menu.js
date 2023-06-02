/************************************************************************************************************ 

(C) www.dhtmlgoodies.com, October 2005 (extensively modified by: JWZ)
 
This is a script from www.dhtmlgoodies.com. You will find this and a lot of other scripts at our website.    
 
Terms of use: 
You are free to use this script as long as the copyright message is kept intact. However, you may not 
redistribute, sell or repost it without our permission. 
 
Thank you! 
 
www.dhtmlgoodies.com 
Alf Magne Kalleland 
 
************************************************************************************************************/

var _menu_object;
var _current_z_index = 1000;
var _li_index = 0;
var _visible_menus = new Array();
var _active_menu_item = false;
var _time_before_auto_hide = 1200;
var _menu_active = true;
var _hide_timer = 0;

var _MSIE = navigator.userAgent.indexOf('MSIE') >= 0 ? true : false;
var _navigator_version = navigator.appVersion.replace(/.*?MSIE ([0-9]\.[0-9]).*/g, '$1') / 1;
var _menu_blocks = new Array();
var _menu_parent_offset_left = false;

function get_style(element, property) {
	if (document.defaultView && document.defaultView.getComputedStyle) {
		var result = null;
		var computed_style = document.defaultView.getComputedStyle(element, '');
		if (computed_style) {
			result = computed_style[property];
			if (!result) {
				var computed_style = document.defaultView.getComputedStyle(element, null);
				result = computed_style.getPropertyCSSValue(property);
			}
		}
		result = result || '';
		return element.style[property] || result;
	}
	if (document.documentElement.currentStyle && _MSIE) {
		var value = element.currentStyle ? element.currentStyle[property] : null;
		return (element.style[property] || value);
	}
	return element.style[property];
}

function get_top_position(input_object) {
	var result = input_object.offsetTop;
	var original_input_object = input_object;
	if (input_object.tagName == 'LI' && input_object.parentNode.className == 'menuBlock1') {
		var a_tag = input_object.getElementsByTagName('A')[0];
		if (a_tag) {
			result += a_tag.parentNode.offsetHeight;
		}
	}
	var top_of_menu_reached = false;
	while (input_object = input_object.offsetParent) {
		if (input_object.parentNode.id == _menu_object.id) {
			top_of_menu_reached = true;
		}
		if (top_of_menu_reached && !input_object.className.match(/menuBlock/gi) || (!_MSIE && original_input_object.parentNode.className == 'menuBlock1')) {
			var style = get_style(input_object, 'position');
			if (style == 'absolute' || style == 'relative') {
				return result;
			}
		}
		result += input_object.offsetTop;
	}
	return result;
}

function get_left_position(input_object) {
	var result = input_object.offsetLeft;
	var top_of_menu_reached = false;
	while (input_object = input_object.offsetParent) {
		if (input_object.parentNode.id == _menu_object.id) {
			top_of_menu_reached = true;
		}
		if (top_of_menu_reached && !input_object.className.match(/menuBlock/gi)) {
			var style = get_style(input_object, 'position');
			if (style == 'absolute' || style == 'relative') {
				return result;
			}
		}
		result += input_object.offsetLeft;
	}
	return result;
}

function show_hide_sub_menu() {
	var current_depth = this.parentNode.getAttribute('currentDepth');
	if (navigator.userAgent.indexOf('Opera') >= 0) {
		current_depth = this.parentNode.current_depth;
	}
	this.className = 'currentDepth' + current_depth + 'over';
	if (_active_menu_item && _active_menu_item != this) {
		_active_menu_item.className = _active_menu_item.className.replace(/over/, '');
	}
	_active_menu_item = this;
	var numeric_id = this.id.replace(/[^0-9]/g, '');
	var exceptions = new Array();
	var sub_menu_item = document.getElementById('subOf' + numeric_id);
	if (sub_menu_item) {
		_visible_menus.push(sub_menu_item);
		sub_menu_item.style.display = '';
		sub_menu_item.parentNode.className = sub_menu_item.parentNode.className + 'over';
		exceptions[sub_menu_item.id] = true;
	}
	var parent_element = this.parentNode;
	while (parent_element && parent_element.id && parent_element.tagName == 'UL') {
		_visible_menus.push(parent_element);
		exceptions[parent_element.id] = true;
		parent_element.style.display = '';
		var li_tag = document.getElementById('menulistItem' + parent_element.id.replace(/[^0-9]/g, ''));
		if (li_tag.className.indexOf('over') < 0) {
			li_tag.className = li_tag.className + 'over';
		}
		parent_element = li_tag.parentNode;
	}
	hide_menu_items(exceptions);
}

function hide_menu_items(exceptions) {
	var new_visible_menus = new Array();
	for (var x = 0; x < _visible_menus.length; x++) {
		if (_visible_menus[x].className != 'menuBlock1' && _visible_menus[x].id) {
			if (!exceptions[_visible_menus[x].id]) {
				var element = _visible_menus[x].getElementsByTagName('A')[0];
				_visible_menus[x].style.display = 'none';
				var li_tag = document.getElementById('menulistItem' + _visible_menus[x].id.replace(/[^0-9]/g, ''));
				if (li_tag.className.indexOf('over') > 0) {
					li_tag.className = li_tag.className.replace(/over/, '');
				}
			} else {
				new_visible_menus.push(_visible_menus[x]);
			}
		}
	}
	_visible_menus = new_visible_menus;
}

function mouse_over_menu() {
	_menu_active = true;
}

function mouse_out_menu() {
	_menu_active = false;
	timer_auto_hide();
}

function timer_auto_hide() {
	if (_menu_active) {
		_hide_timer = 0;
		return;
	}
	if (_hide_timer < _time_before_auto_hide) {
		_hide_timer += 100;
		setTimeout('timer_auto_hide()', 99);
	} else {
		_hide_timer = 0;
		autohide_menu_items();
	}
}

function autohide_menu_items() {
	if (!_menu_active) {
		hide_menu_items(new Array());
		if (_active_menu_item) {
			_active_menu_item.className = _active_menu_item.className.replace(/over/, '');
		}
	}
}

function initialize_sub_menus(input_object, initial_offset_left, current_depth) {
	var sub_ul_tags = input_object.getElementsByTagName('UL');
	if (sub_ul_tags.length > 0) {
		var ul_tag = sub_ul_tags[0];
		ul_tag.id = 'subOf' + input_object.id.replace(/[^0-9]/g, '');
		ul_tag.setAttribute('currentDepth', current_depth);
		ul_tag.current_depth = current_depth;
		ul_tag.className = 'menuBlock' + current_depth;
		ul_tag.onmouseover = mouse_over_menu;
		ul_tag.onmouseout = mouse_out_menu;
		_current_z_index += 1;
		ul_tag.style.zIndex = _current_z_index;
		_menu_blocks.push(ul_tag);
		ul_tag = _menu_object.appendChild(ul_tag);
		var top_position = get_top_position(input_object);
		if (current_depth >= 3) {
			top_position -= 1;
		}
		var left_position = get_left_position(input_object) / 1 + initial_offset_left / 1;
		ul_tag.style.position = 'absolute';
		ul_tag.style.left = left_position + 'px';
		ul_tag.style.top = top_position + 'px';
		var li_tag = ul_tag.getElementsByTagName('LI')[0];
		while (li_tag) {
			if (li_tag.tagName == 'LI') {
				li_tag.className = 'currentDepth' + current_depth;
				li_tag.id = 'menulistItem' + _li_index;
				_li_index++;
				var ul_tags = li_tag.getElementsByTagName('UL');
				li_tag.onmouseover = show_hide_sub_menu;
				if (ul_tags.length > 0) {
					var offsetToFunction = li_tag.getElementsByTagName('A')[0].offsetWidth + 2;
					if (current_depth >= 2) {
						offsetToFunction += 6;
					}
					if (_navigator_version < 6 && _MSIE) {
						offsetToFunction += 15;
					}
					initialize_sub_menus(li_tag, offsetToFunction, (current_depth + 1));
				}
				if (_MSIE) {
					var a = li_tag.getElementsByTagName('A')[0];
					a.style.width = li_tag.offsetWidth + 'px';
					a.style.display = 'block';
				}
			}
			li_tag = li_tag.nextSibling;
		}
		ul_tag.style.display = 'none';
	}
}

function resize_menu() {
	var offset_parent = get_left_position(_menu_object);
	for (var x = 0; x < _menu_blocks.length; x++) {
		var left_position = _menu_blocks[x].style.left.replace('px', '') / 1;
		_menu_blocks[x].style.left = left_position + offset_parent - _menu_parent_offset_left + 'px';
	}
	_menu_parent_offset_left = offset_parent;
}

/* Initializing menu */

function initialize_menu(element_id, config) {
	_menu_object = document.getElementById(element_id);
	if (!_menu_object) {
    return;
  }
  if (config) {
    reset_menu();
    generate_menu(config);
  }
  var menu = _menu_object.getElementsByTagName('UL')[0];
  menu.className = 'menuBlock1';
  menu.style.zIndex = _current_z_index;
  menu.setAttribute('currentDepth', 1);
  menu.current_depth = '1';
  menu.onmouseover = mouse_over_menu;
  menu.onmouseout = mouse_out_menu;
  var menu_items = new Array();
  var menu_item = menu.getElementsByTagName('LI')[0];
  menu.style.height = menu_item.offsetHeight + 2 + 'px';
  while (menu_item) {
    menu_item.className = 'currentDepth1';
    menu_item.id = 'menulistItem' + _li_index;
    menu_item.onmouseover = show_hide_sub_menu;
    _li_index++;
    if (menu_item.tagName == 'LI') {
      menu_item.style.cssText = 'float:left;';
      menu_item.style.styleFloat = 'left';
      menu_items[menu_items.length] = menu_item;
      initialize_sub_menus(menu_item, 0, 2);
    }
    menu_item = menu_item.nextSibling;
  }
  for (var x = 0; x < menu_items.length; x++) {
    initialize_sub_menus(menu_items[x], 0, 2);
  }
  _menu_parent_offset_left = get_left_position(_menu_object);
  window.onresize = resize_menu;
  _menu_object.style.visibility = 'visible';
}

function reset_menu() {
	while (_menu_object.hasChildNodes()) {
		_menu_object.removeChild(_menu_object.firstChild);
	}
}

function generate_menu(config) {
	var ul_tag = document.createElement('UL');
	for (var x = 0; x < config.length; x++) {
		ul_tag.appendChild(generate_menu_item(config[x]));
	}
	_menu_object.appendChild(ul_tag);
}

function generate_menu_item(config) {
	var li_tag = document.createElement('LI');
	var a_tag = document.createElement('A');
  var text = config['text'];
	if (text) {
		a_tag.innerHTML = text;
	}
  var href = config['href'];
	if (href) {
		a_tag.setAttribute('href', href);
	}
  var onclick = config['onclick'];
	if (onclick) {
		a_tag.onclick = onclick;
	}
	li_tag.appendChild(a_tag);
  var children = config['children'] || [];
	if (children) {
	  var ul_tag = document.createElement('UL');
		for (var x = 0; x < children.length; x++) {
			ul_tag.appendChild(generate_menu_item(children[x]));
		}
	  li_tag.appendChild(ul_tag);
	}
	return li_tag;
}
